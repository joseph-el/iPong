import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  BoardName: string;
}
