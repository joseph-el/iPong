import { IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class InviteUsersDto {
  @IsNumber()
  roomId: number;

  @IsArray()
  @ArrayNotEmpty()
  userIds: number[];
}