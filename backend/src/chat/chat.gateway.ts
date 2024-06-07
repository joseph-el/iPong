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

@WebSocketGateway(3003, {
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() private server: Server;
  private readonly jwtService: JwtService;
  private readonly databaseService: DatabaseService;
  private readonly notificationService: NotificationsService;

  constructor(jwtService: JwtService) {
    this.databaseService = new DatabaseService();
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

  @OnEvent('sendNotification')
  async sendNotification(
    notification: CreateNotificationDto,
    blockedRoomMembersIds?: string[],
  ) {
    try {
      switch (notification.entityType) {
        case $Enums.NotificationType.FriendRequestAccepted:
        case $Enums.NotificationType.FriendRequest: {
          const newNotif = await this.notificationService.createNotification(notification);
          const channellname: string = `User:${newNotif.receiverId}`;
          this.server
            .to(channellname)
            .emit('notification', { ...newNotif, entity: null });
          break;
        }
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
