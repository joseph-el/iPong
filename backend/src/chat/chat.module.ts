import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
    providers: [ChatGateway, JwtService, DatabaseModule, NotificationsService, DatabaseService],
})
export class ChatModule {}
