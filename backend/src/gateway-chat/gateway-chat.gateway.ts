import { ChatroomService } from './../chatroom/chatroom.service';
import { Logger } from '@nestjs/common';
import { use } from 'passport';
import { ChatRoomType, NotificationType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { JoinRoomDto } from 'src/chatroom/dto/JoinRoom.dto';
import { CreateChatroomDto } from 'src/chatroom/dto/create-chatroom.dto';
import { MessageFormatDto } from 'src/messages/dto/msgFormat.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
  transports: ['websocket'],
})
export class GatewayChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly jwtService: JwtService;
  private readonly databaseService: DatabaseService;
  private ChatroomService: ChatroomService;

  constructor(jwtService: JwtService) {
    this.databaseService = new DatabaseService();
    this.jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
    });
  }

  private logger: Logger = new Logger('RoomGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }
  @WebSocketServer() server: Server;
  async handleConnection(client: Socket) {

    const token = client.handshake.auth.token as string;
    if (!token) {
      client.disconnect(true);
      return;
    }
    try {
      const decoded = this.jwtService.verify(token);
      client.data.user = decoded;
    } catch (error) {
      client.disconnect(true);
      return;
    }
    const userId = client.data.user.userId;
    console.log('client connected:::::::::::::::::::', userId);
    client.join(`User:${userId}`);
    const frienduserIds = await this.databaseService.friendship.findMany({
      where: {
        OR: [
          {
            fromUser: userId,
          },
          {
            toUser: userId,
          },
        ],
        status: 'ACCEPTED',
      },
      select: {
        fromUser: true,
        toUser: true,
      },
    });
    const friendIds = frienduserIds
      .map((friend) =>
        friend.toUser === userId ? friend.fromUser : friend.toUser,
      )
      .filter(
        (id) => this.server.sockets.adapter?.rooms?.get(`User:${id}`)?.size,
      );

    // console.log('friendIds', friendIds);

    client.emit('onlineFriends', friendIds);
    this.server.emit('friendOnline', userId);
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.user.userId;
    console.log('client disconnected', userId);
    this.server.emit('friendOffline', userId);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(client: Socket, data: CreateChatroomDto) {
    try {
      // Validate the data
      if (data.type === ChatRoomType.protected && !data.password) {
        client.emit('error', {
          message: 'Password is required for protected rooms',
        });
        return;
      }

      // Create the room
      const newRoom = await this.ChatroomService.create(
        data,
        client.data.user.userId,
      );
      if (!newRoom) {
        client.emit('error', { message: 'Error creating room' });
        return;
      }
      // Add the client to the room
      // client.join(`Room:${newRoom.id}`);
      client.emit('roomCreated', newRoom);
    } catch (error) {
      this.logger.error(`Error creating room: ${error.message}`);
      client.emit('error', { message: 'Error creating room' });
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoomEvent(client: Socket, data: any) {
    console.log("joinRoom event , data: ", data)
    const userId = client.data.user.sub;
    const member = await this.databaseService.chatRoomMember.findFirst({
      where: {
        memberID: data.memberId,
        chatRoomId: data.roomId,
      },
    });
    if (member && !member.isBanned && userId === data.memberId) {
      client.join(`Room:${data.roomId}`);
      console.log('joined room', data.roomId);
    }
  }

  @OnEvent('sendMessages')
  async sendMessage(
    message: MessageFormatDto,
    blockedRoomMembersIds?: string[],
  ) {
    console.log('sendMessages event', message);
    const chanellname: string = `Room:${message.roomId}`;
    if (!blockedRoomMembersIds) {
      this.server.to(chanellname).emit('message', message);
    } else {
      const sockets = await this.server.in(chanellname).fetchSockets();
      for await (const socket of sockets) {
        if (!blockedRoomMembersIds.includes(socket.data.user.sub)) {
          socket.emit('message', message);
        } else {
          socket.emit('message', {
            ...message,
            content: '[REDACTED]',
          });
        }
      }
    }
  }
}
