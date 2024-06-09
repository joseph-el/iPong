import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NotificationsService {

  constructor(private readonly dataservice: DatabaseService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const result = await this.dataservice.notification.create({
      data: createNotificationDto,
    });
    return result;
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

}
