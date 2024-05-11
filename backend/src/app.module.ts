import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';

import { MessageModule } from './messages/message.module';
import { ChatroomModule } from './chatroom/chatroom.module';  
import { FriendshipModule } from './friendship/friendship.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    JwtModule,
    MessageModule,
    ChatroomModule,
    FriendshipModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
