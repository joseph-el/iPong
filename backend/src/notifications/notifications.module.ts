import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { DatabaseService } from 'src/database/database.service';
import { NotificationsListener } from './notifications.listener';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, DatabaseService, NotificationsListener, NotificationsService],
})
export class NotificationsModule {}
