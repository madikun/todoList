import { IsArray, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TodoItem } from '../models/todo-item.model';
import { UserEmailDto } from 'src/users/dto/user-email.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoListDto {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsArray()
  list?: TodoItem[];

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsEmail()
  author: UserEmailDto;
}
