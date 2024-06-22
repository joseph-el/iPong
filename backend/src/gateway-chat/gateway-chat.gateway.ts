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

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleConnection(client: Socket) {
    console.log('Client connected');
    const token = client.handshake.auth.token as string;

    // console.log(token);
    if (!token) {
      client.disconnect(true);
      return;
    }
    


    try {   
      const decoded = this.jwtService.verify(token);
      console.log(decoded);
      client.data.user = decoded;
    } catch (error) {
      client.disconnect(true);
      return;
    }
    


    const userId = client.data.user.userId;
    client.join(`User:${userId}`);
    console.log('User connected:', userId);
    const frienduserIds = await this.databaseService.friendship.findMany({
      where: {
        OR: [{ fromUser: userId }, { toUser: userId }],
        status: 'ACCEPTED',
      },
      select: { fromUser: true, toUser: true },
    });

    if (!frienduserIds.length) {
      return;
    }

    const friendIds = frienduserIds
      .map((friend) =>
        friend.toUser === userId ? friend.fromUser : friend.toUser,
      )
      .filter((id) => {
        const rooms = this.server?.sockets?.adapter?.rooms;
        return rooms && rooms.get(`User:${id}`)?.size;
      });

    client.emit('onlineFriends', friendIds);
    this.server.emit('friendOnline', userId);
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.user.userId;
    this.server.emit('friendOffline', userId);
    console.log('User disconnected:', userId);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(client: Socket, data: CreateChatroomDto) {
    try {
      if (data.type === ChatRoomType.protected && !data.password) {
        client.emit('error', {
          message: 'Password is required for protected rooms',
        });
        return;
      }
      const newRoom = await this.ChatroomService.create(
        data,
        client.data.user.userId,
      );
      if (!newRoom) {
        client.emit('error', { message: 'Error creating room' });
        return;
      }
      client.emit('roomCreated', newRoom);
    } catch (error) {
      this.logger.error(`Error creating room: ${error.message}`);
      client.emit('error', { message: 'Error creating room' });
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoomEvent(client: Socket, data: JoinRoomDto) {
    const userId = client.data.user.userId;
    const member = await this.databaseService.chatRoomMember.findFirst({
      where: {
        memberID: userId,
        chatRoomId: data.roomId,
      },
    });
    if (member && !member.isBanned) {
      client.join(`Room:${data.roomId}`);
      client.emit('joinedRoom', data.roomId);
      
      console.log('User joined room:', data.roomId);

    } else {
      client.emit('error', { message: 'Unable to join room' });
    }
  }

  @OnEvent('sendMessages')
  async sendMessage(
    message: MessageFormatDto,
    blockedRoomMembersIds?: string[],
  ) {
    const chanellname = `Room:${message.roomId}`;
    if (!blockedRoomMembersIds) {
      this.server.to(chanellname).emit('message', message);
    } else {
      const sockets = await this.server.in(chanellname).fetchSockets();
      for await (const socket of sockets) {
        if (!blockedRoomMembersIds.includes(socket.data.user.userId)) {
          socket.emit('message', message);
        } else {
          socket.emit('message', { ...message, content: '[REDACTED]' });
        }
      }
    }
  }
}
