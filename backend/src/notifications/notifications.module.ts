import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, DatabaseService, NotificationsService, JwtService],
})
export class NotificationsModule {}
