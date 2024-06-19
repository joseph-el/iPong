import { IsNotEmpty, IsString } from 'class-validator';

export class TfaDto {
  @IsNotEmpty()
  @IsString()
  readonly otp: string;

  @IsNotEmpty()
  @IsString()
  readonly tfaToken: string;
}
