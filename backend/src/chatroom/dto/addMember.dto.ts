import { IsNotEmpty, IsString } from 'class-validator';

export class addMemberDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
