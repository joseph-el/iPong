import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { DatabaseService } from 'src/database/database.service';
import { CloudinaryService } from 'src/imagesProvider/cloudinary.service';

@Module({
  controllers: [ChatroomController],
  providers: [ChatroomService, DatabaseService, CloudinaryService],
})
export class ChatroomModule {}
