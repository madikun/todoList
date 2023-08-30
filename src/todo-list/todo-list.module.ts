import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from './models/todo-list.model';
import { TodoItem } from './models/todo-item.model';
import { TodoListController } from './todo-list.controller';
import { TodoListService } from './todo-list.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [TodoListService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
      { name: TodoItem.name, schema: TodoListSchema },
    ]),
  ],
  controllers: [TodoListController],
  exports: [TodoListService],
})
export class TodoListModule {}
