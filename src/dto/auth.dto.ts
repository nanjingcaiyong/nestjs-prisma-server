import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsString()
  authName: string;
  @ApiProperty()
  @IsNumber()
  type: number;
}
