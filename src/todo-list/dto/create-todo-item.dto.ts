import { IsDate, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsString()
  title: string;
  @IsString()
  text: string;
  @IsDate()
  createdAt: Date;
  @IsString()
  list?: string;
}
