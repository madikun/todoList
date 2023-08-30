import { IsArray, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TodoItem } from '../models/todo-item.model';
import { UserEmailDto } from 'src/users/dto/user-email.dto';

export class CreateTodoListDto {
  @IsString()
  title?: string;
  @IsArray()
  list?: TodoItem[];
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
  @IsNotEmpty()
  @IsEmail()
  author: UserEmailDto;
}
