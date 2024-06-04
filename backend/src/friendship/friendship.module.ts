import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { DatabaseService } from 'src/database/database.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationsListener } from 'src/notifications/notifications.listener';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  controllers: [FriendshipController],
  providers: [
    FriendshipService,
    DatabaseService,
    EventEmitter2,
    NotificationsListener,
    NotificationsService
  ],
})
export class FriendshipModule {}
