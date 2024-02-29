import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class AccountDto {
  @IsString()
  @ApiProperty()
  account: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  roleIds: Number[];
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
