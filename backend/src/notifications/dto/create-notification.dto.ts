import { NotificationType } from '@prisma/client';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  receiverId: string;

  @IsString()
  senderId: string;

  @IsBoolean()
  @IsOptional()// Mark as optional if you want to use the default value
  isRead?: boolean;

  @IsString()
  entityType: NotificationType;

  @IsString()
  @IsOptional()
  roomId?: string;

  @IsString()
  id: string;
}
