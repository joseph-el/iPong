import { ChatRoomType } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  ValidateIf,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateChatroomDto {
  @ValidateIf((o) => o.type !== 'Dm')
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ChatRoomType)
  type: ChatRoomType;

  @IsString()
  @IsOptional()
  password: string;

  @ValidateIf((o) => o.type === 'Dm')
  @IsString()
  @IsNotEmpty()
  secondUser: string;
}
