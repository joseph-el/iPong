import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveRoomDto {
  @IsNotEmpty()
  @IsString() // Add missing import statement for IsString decorator
  roomId: string;
}
