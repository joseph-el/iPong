import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { GetCurrentUser } from 'src/auth/decorators/getCurrentUser.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("createNotification")
  async create(@GetCurrentUser("userId") createNotificationDto: CreateNotificationDto) {
    return await this.notificationsService.create(createNotificationDto);
  }

  @Post("readAllNotifications")
  async readAll(@GetCurrentUser("userId") userId: string){
    return await this.notificationsService.readAll(userId);
  }

  @Get("getAllNotifications")
  async findAll(userId: string) {
    return await this.notificationsService.findAll(userId);
  }

  @Get("getNotificationsnumber")
  async getNotificationsNumber(userId: string) {
    return await this.notificationsService.getNotificationsNumber(userId);
  }

  @Delete("deleteNotifications")
  async clearAll(@GetCurrentUser("userId") userId: string){
    return await this.notificationsService.clearAll(userId);
  }
}
