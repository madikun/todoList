import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoItemsDto {
  @IsArray()
  @IsNotEmpty()
  list: UpdateTodoItemDto[];
  @IsString()
  @IsNotEmpty()
  listId: string;
}

export class UpdateTodoItemDto {
  @IsString()
  title?: string;
  @IsString()
  text?: string;
  @IsBoolean()
  isDone?: boolean;
}
