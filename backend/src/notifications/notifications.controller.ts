import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { GetCurrentUser } from 'src/auth/decorators/getCurrentUser.decorator';
import { AtGuard } from 'src/auth/Guards/access.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AtGuard)
  @Post('createNotification')
  async create(createNotificationDto: CreateNotificationDto,
  ) {
    return await this.notificationsService.create(createNotificationDto);
  }

  @UseGuards(AtGuard)
  @Get('readAllNotifications')
  async readAll(@GetCurrentUser('userId') userId: string) {
    return await this.notificationsService.readAll(userId);
  }

  @UseGuards(AtGuard)
  @Get('getAllNotifications')
  async findAll(userId: string) {
    return await this.notificationsService.findAll(userId);
  }

  @UseGuards(AtGuard)
  @Get('getNotificationsnumber')
  async getNotificationsNumber(userId: string) {
    return await this.notificationsService.getNotificationsNumber(userId);
  }

  @UseGuards(AtGuard)
  @Delete('deleteNotifications')
  async clearAll(@GetCurrentUser('userId') userId: string) {
    return await this.notificationsService.clearAll(userId);
  }

  // get method to get a single notification
  @UseGuards(AtGuard)
  @Get('getNotification/:id')
  async findOne(
    @GetCurrentUser('userId') userId: string,
    @Param('id') id: string,
  ) {
    return await this.notificationsService.findOne(userId, id);
  }

  // delete method to delete a single notification
  @UseGuards(AtGuard)
  @Delete('deleteNotification/:id')
  async remove(
    @GetCurrentUser('userId') userId: string,
    @Param('id') id: string,
  ) {
    console.log("delete notification", userId, id)
    return await this.notificationsService.remove(userId, id);
  }

  // get method to get all unread notifications
  @UseGuards(AtGuard)
  @Get('unreadNotifications')
  async getUnreadNotifications(@GetCurrentUser('userId') userId: string) {
    return await this.notificationsService.getUnreadNotifications(userId);
  }
}
