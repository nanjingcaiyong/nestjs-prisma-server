import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class StoryDto {
  @IsString()
  // @Contains('hello')
  @MaxLength(4, {
    message: 'Title is too long',
  })
  @ApiProperty()
  storyName: string;
  @IsString()
  @ApiProperty()
  creatorName: string;
  @IsString()
  @ApiProperty()
  description: string;
}
