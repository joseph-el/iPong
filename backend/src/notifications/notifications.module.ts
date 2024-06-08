import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { DatabaseService } from 'src/database/database.service';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, DatabaseService, NotificationsService, ChatGateway, JwtService],
})
export class NotificationsModule {}
