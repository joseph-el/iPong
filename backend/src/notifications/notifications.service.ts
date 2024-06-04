import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { DatabaseService } from 'src/database/database.service';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter } from 'stream';

@Injectable()
export class NotificationsService extends EventEmitter{
  constructor(private readonly dataservice: DatabaseService) {
    super();
  }
  async create(createNotificationDto: CreateNotificationDto) {
    await this.dataservice.notification.create({
      data: createNotificationDto,
    });
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
