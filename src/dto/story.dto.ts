import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StoryDto {
  @IsString()
  @ApiProperty()
  storyName: string;
  @IsString()
  @ApiProperty()
  creatorName: string;
  @IsString()
  @ApiProperty()
  description: string;
}
