import { IsNotEmpty, IsString } from "class-validator";

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  keyword: string;
    
    @IsNotEmpty()
    @IsString()
    type: string;
}