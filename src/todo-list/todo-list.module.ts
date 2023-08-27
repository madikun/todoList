import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from './models/todo-list.model';
import { TodoItem } from './models/todo-item.model';
import { TodoListController } from './todo-list.controller';

@Module({
  providers: [],
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
      { name: TodoItem.name, schema: TodoListSchema },
    ]),
  ],
  controllers: [TodoListController],
})
export class TodoListModule {}
