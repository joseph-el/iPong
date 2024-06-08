import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { CloudinaryService } from 'src/imagesProvider/cloudinary.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService, DatabaseService, UsersService, CloudinaryService, FriendshipService, ChatGateway,JwtService,
    NotificationsService
  ],
})
export class UserProfileModule {}
