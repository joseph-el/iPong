import { DatabaseService } from 'src/database/database.service';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from 'src/chatroom/dto/JoinRoom.dto';
import { JwtService } from '@nestjs/jwt';
import { OnEvent } from '@nestjs/event-emitter';
import { Notification, $Enums } from '@prisma/client';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MessageService } from 'src/messages/message.service';
import { MessageFormatDto } from 'src/messages/dto/msgFormat.dto';

@WebSocketGateway(3003, {
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server;
  private readonly jwtService: JwtService;
  private readonly databaseService: DatabaseService;
  private readonly notificationService: NotificationsService;
  private readonly messageService: MessageService;

  constructor(jwtService: JwtService) {
    this.databaseService = new DatabaseService();
    this.notificationService = new NotificationsService(this.databaseService);
    this.jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
    });
  }

  afterInit(server: Server): void {
    // console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers['access_token'] as string;

    if (!token) {
      // console.log('No access token found in headers');
      client.disconnect(true);
      return;
    }

    try {
      const decoded = this.jwtService.verify(token);
      client.data.user = decoded;
      // console.log(decoded)
    } catch (error) {
      // console.log('Invalid access token');
      client.disconnect(true);
      return;
    }
    const userId = client.data.user.sub;
    // console.log(`User ID: ${userId}`);
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

  async handleDisconnect(client: Socket): Promise<void> {
    // console.log(`Client disconnected: ${client.id}`);
    this.server.emit('friendOffline', client.data.user.sub);
  }
  @SubscribeMessage('sendNotification')
  async sendNotification(
    notif: CreateNotificationDto,
    blockedRoomMembersIds?: string[],
  ) {
    console.log('Friend request notification');
    try {
      switch (notif.entityType) {
        case $Enums.NotificationType.FriendRequestAccepted:
        case $Enums.NotificationType.FriendRequest:
          await this.handleFriendNotification(notif);
          break;
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }



  private async handleFriendNotification(notif: CreateNotificationDto) {
    const newNotif = await this.notificationService.create(notif);
    const channelName: string = `User:${newNotif.receiverId}`;
    this.server.to(channelName).emit('notification', {
      ...newNotif,
      entity: null,
    });
  }

  // TODO: Implement this method
  // private async handleMessageNotification(
  //   notif: CreateNotificationDto,
  //   blockedRoomMembersIds?: string[],
  // ) {
  //   const message = await this.databaseService.message.findUnique({
  //     where: {
  //       id: notif.entityId,
  //     },
  //     include: {
  //       author: {
  //         select: {
  //           userId: true,
  //           avatar: true,
  //           username: true,
  //         },
  //       },
  //       ChatRoom: {
  //         select: {
  //           id: true,
  //           type: true,
  //         },
  //       },
  //     },
  //   });

  //   let roomMembers = await this.databaseService.chatRoomMember.findMany({
  //     where: {
  //       id: message.ChatRoom.id,
  //     },
  //     select: {
  //       memberID: true,
  //       isBanned: true,
  //       isMuted: true,
  //     },
  //   });

  //   roomMembers = roomMembers.filter(
  //     (member) =>
  //       member.memberID !== message.authorId &&
  //       member.memberID !== notif.senderId &&
  //       !member.isBanned &&
  //       !member.isMuted,
  //   );
  //   const clientsSockets = await this.server
  //     .in(`Room:${message.chatRoomId}`)
  //     .fetchSockets();

  //   const nofifPromises = roomMembers.map(async (member) => {
  //     if (blockedRoomMembersIds?.includes(member.memberID)) return;


  //     const checkMemberConnected = roomMembers.map((member) =>
  //       clientsSockets.some((client) => client.data.user.sub === member.memberID),
  //     );
  //     if (checkMemberConnected.length === 0) return;
  //     const createNotification = await this.handleFriendNotification({
  //       ...notif,
  //       receiverId: member.memberID,
  //     });
  //     const channelName: string = `User:${member.memberID}`;
  //     this.server.to(channelName).emit('notification', {
  //       createNotification,
  //       entity: new MessageFormatDto(message),
  //     });
  //   }
  //   );
  // }
}