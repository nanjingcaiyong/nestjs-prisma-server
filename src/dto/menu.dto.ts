import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class MenuDto {
  @ApiProperty()
  @IsString()
  menuName: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  path: string;
  @ApiProperty()
  @IsString()
  creator: string;
  @ApiProperty()
  @IsNumber()
  type: number;
}
