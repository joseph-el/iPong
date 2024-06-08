import { Module } from '@nestjs/common';
import { FortyTwoStrategy } from './strategies/42.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';
import { CloudinaryService } from 'src/imagesProvider/cloudinary.service';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
  imports: [UsersModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [AuthController],
  providers: [
    FortyTwoStrategy,
    UsersService,
    AuthService,
    DatabaseService,
    RtStrategy,
    AtStrategy,
    CloudinaryService,
    UserProfileService,
    FriendshipService,
    NotificationsService,
    ChatGateway
  ],
})
export class AuthModule {}
