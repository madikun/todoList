import { IsDate, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoItemDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;

  @IsDate()
  createdAt: Date;

  @ApiPropertyOptional()
  @IsString()
  list?: string;
}
