import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("createNotification")
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationsService.create(createNotificationDto);
  }

  @Get("getAllNotifications")
  async findAll(userId: string) {
   
    return await this.notificationsService.findAll(userId);
  }

  @Delete("deleteNotifications")
  async clearAll(@Body() userId: string){
    return await this.notificationsService.clearAll(userId);
  }
}
