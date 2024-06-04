import { Injectable, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
@Injectable()
export class NotificationsListener implements OnModuleInit{
  constructor(private readonly notificationsService: NotificationsService) {}

  onModuleInit() {
    this.notificationsService.on('sendNotification', (payload: CreateNotificationDto) => {
      console.log('Event received:', payload);
      this.notificationsService.create(payload);
    });
  }
  
}
