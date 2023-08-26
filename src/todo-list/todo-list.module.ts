import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from './models/todo-list.model';
import { TodoItem } from './models/todo-item.model';

@Module({
  providers: [],
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
      { name: TodoItem.name, schema: TodoListSchema },
    ]),
  ],
})
export class TodoListModule {}
