import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoItemDto {
  @ApiPropertyOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isDone?: boolean;
}

export class UpdateTodoItemsDto {
  @ApiProperty({ type: [UpdateTodoItemDto] })
  @IsArray()
  @IsNotEmpty()
  list: UpdateTodoItemDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  listId: string;
}
