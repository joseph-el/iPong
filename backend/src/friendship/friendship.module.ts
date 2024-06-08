import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { DatabaseService } from 'src/database/database.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationsService } from 'src/notifications/notifications.service';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
  controllers: [FriendshipController],
  providers: [
    FriendshipService,
    DatabaseService,
    EventEmitter2,
    NotificationsService,
    ChatGateway,
    JwtService
  ],
})
export class FriendshipModule {}
