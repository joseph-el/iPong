import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeOwnerDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;
  @IsNotEmpty()
  @IsString()
  memberId: string;
}
