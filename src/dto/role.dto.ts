import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber, ArrayMinSize } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsString()
  roleName: string;
  @ApiProperty()
  @IsString()
  creator: string;
  @ApiProperty({
    type: [Number],
    example: [2, 3, 4],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true }) // 检查数组中的每个元素是否为 number 类型
  readonly authIds: number[];
}

export class DeleteRoleDto {
  @ApiProperty({
    type: [Number],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  readonly ids: number[];
}
