import { IsNotEmpty, IsString } from 'class-validator';

export class setAdminDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
