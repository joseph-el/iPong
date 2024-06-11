import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { DatabaseService } from 'src/database/database.service';
import { CloudinaryService } from 'src/imagesProvider/cloudinary.service';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { UsersService } from 'src/users/users.service';
import { FriendshipService } from 'src/friendship/friendship.service';

@Module({
  controllers: [ChatroomController],
  providers: [ChatroomService, DatabaseService, CloudinaryService, UserProfileService, UsersService, FriendshipService],
})
export class ChatroomModule {}
