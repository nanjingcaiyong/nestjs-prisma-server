import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  @IsEmail()
  email: string;
  @IsString()
  @ApiProperty()
  no: string;
  @IsString()
  @ApiProperty()
  jobName: string;
}
