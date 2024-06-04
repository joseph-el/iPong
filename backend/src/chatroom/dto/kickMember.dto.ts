import { IsNotEmpty, IsString } from 'class-validator';

export class kickMemberDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
