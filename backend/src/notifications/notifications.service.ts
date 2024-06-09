import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { DatabaseService } from 'src/database/database.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsService {

  constructor(private readonly dataservice: DatabaseService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    if (createNotificationDto.receiverId === createNotificationDto.senderId) {
      return;
    }
    const exist = await this.dataservice.notification.findUnique({
      where: {
        senderId: createNotificationDto.senderId,
        receiverId: createNotificationDto.receiverId,
        entityType: NotificationType.FriendRequest,
        id: createNotificationDto.id
      },
    });
    if (exist) {
      await this.dataservice.notification.update({
        where: {
          id: exist.id,
        },
        data: {
          createdAt: new Date(),
        },
      });
      return;
    }
   
    return await this.dataservice.notification.create({
      data: createNotificationDto,
    });;
  }

  async findAll(userId: string) {
    return await this.dataservice.notification.findMany({
      where: {
        receiverId: userId,
        isRead: false,
      },
    });
  }

  async getNotificationsNumber(userId: string) {
    return await this.dataservice.notification.count({
      where: {
        receiverId: userId,
        isRead: false,
      },
    });
  }
  async clearAll(userId: string) {
    return await this.dataservice.notification.deleteMany({
      where: {
        receiverId: userId,
      },
    });
  }

  async readAll(userId: string) {
    return await this.dataservice.notification.updateMany({
      where: {
        receiverId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }

  async findOne(userId: string, id: string) {
    return await this.dataservice.notification.findUnique({
      where: {
        id: id,
        receiverId: userId,
      },
    });
  }
  async remove(userId: string, id: string) {
    return await this.dataservice.notification.delete({
      where: {
        id: id,
        receiverId: userId,
      },
    });
  }

  async getUnreadNotifications(userId: string) {
    return await this.dataservice.notification.findMany({
      where: {
        receiverId: userId,
        isRead: false,
      },
    });
  }

}
