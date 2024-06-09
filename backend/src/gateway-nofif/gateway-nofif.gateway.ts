import { use } from 'passport';
import { NotificationType } from '@prisma/client';
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
import { OnEvent , EventEmitter2} from '@nestjs/event-emitter';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'notifications',
  transports: ['websocket'],
})
export class GatewayNofifGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly jwtService: JwtService;
  private readonly databaseService: DatabaseService;
  private readonly notificationService: NotificationsService;
  private readonly eventEmitter: EventEmitter2;

  constructor(jwtService: JwtService) {
    this.databaseService = new DatabaseService();
    this.notificationService = new NotificationsService(this.databaseService);
    this.jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
    });
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
    console.log('client connected', userId);
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
  async handleDisconnect(client: any) {
    console.log('client disconnected', client.id);
  }

  @OnEvent('sendNotification')
  async sendNotification(
    notif: CreateNotificationDto,
    blockedRoomMembersIds?: string[],
  ) {
    console.log('Friend request notification');
    const newNotif = await this.notificationService.create(notif);
    const channelName: string = `User:${newNotif.receiverId}`;

    this.server.to(channelName).emit('sendNotification', {
      ...newNotif,
      entity: null,
    });
  }
}
