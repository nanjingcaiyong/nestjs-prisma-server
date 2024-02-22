import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class AccountDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
export class SignDto {
  @ApiProperty()
  @IsString()
  account: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
