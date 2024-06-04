import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    providers: [ChatGateway, JwtService, DatabaseModule],
})
export class ChatModule {}
