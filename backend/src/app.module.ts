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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserProfileModule } from './user-profile/user-profile.module';
import { CloudinaryModule } from './imagesProvider/cloudinary.module';
import { CloudinaryService } from './imagesProvider/cloudinary.service';
import { NotificationsModule } from './notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatGateway } from './chat/chat.gateway';
import { APP_GUARD } from '@nestjs/core';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    JwtModule,
    MessageModule,
    ChatroomModule,
    FriendshipModule,
    ConfigModule.forRoot({}),
    UserProfileModule,
    CloudinaryModule,
    NotificationsModule,
    EventEmitterModule.forRoot(),
    ChatModule,
    GameModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    CloudinaryService,
    ChatGateway,
    // {
    //   provide: APP_GUARD,
    //   useClass: GatewayAdapter,
    // },
  ],
})
export class AppModule {}
