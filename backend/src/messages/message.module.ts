import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { DatabaseService } from 'src/database/database.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, DatabaseService ,NotificationsService,
  ],
})
export class MessageModule {}
