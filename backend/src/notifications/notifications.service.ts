import { ChatGateway } from './../chat/chat.gateway';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NotificationsService {

  constructor(private readonly dataservice: DatabaseService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    console.log('createNotificationDto', createNotificationDto);
    const result = await this.dataservice.notification.create({
      data: createNotificationDto,
    });
    console.log('result', result);
    return result;
  }

  async findAll(userId: string) {
    return this.dataservice.notification.findMany({
      where: {
        receiverId: userId,
      },
    });
  }

  async clearAll(userId: string) {
    return this.dataservice.notification.deleteMany({
      where: {
        receiverId: userId,
      },
    });
  }

  async createNotification(notif: CreateNotificationDto) {
    const newNotif = await this.dataservice.notification.create({
      data: notif,
      include: {
        sender: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
    return newNotif;
  }
}
