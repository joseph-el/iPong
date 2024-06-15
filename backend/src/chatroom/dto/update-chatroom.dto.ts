import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomDto } from './create-chatroom.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ChatRoomType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomDto extends PartialType(CreateChatroomDto) {
  @IsOptional()
  roomName?: string;

  @IsOptional()
  type?: ChatRoomType;

  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsOptional()
  password?: string;
}
