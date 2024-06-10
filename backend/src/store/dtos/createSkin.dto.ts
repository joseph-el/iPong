import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSkinDto {
  @IsNotEmpty()
  @IsString()
  SkinName: string;
}
