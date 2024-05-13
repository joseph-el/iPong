import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class usersSearchDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
