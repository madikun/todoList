import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoList, TodoListDocument } from './models/todo-list.model';
import { Model } from 'mongoose';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UserEmailDto } from 'src/users/dto/user-email.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';

@Injectable()
export class TodoListService {
  constructor(
    private readonly usersServise: UsersService,
    @InjectModel(TodoList.name) private readonly todoList: Model<TodoListDocument>,
  ) {}
  async createTodoList(createTodoListDto: CreateTodoListDto) {
    const { _id: userId } = await this.usersServise.findUser(createTodoListDto.author);
    const newTodoList = await new this.todoList({ ...createTodoListDto, author: userId });
    return newTodoList.save();
  }

  async getByUser(email: UserEmailDto) {
    const { _id: userId } = await this.usersServise.findUser(email);
    const lists = await this.todoList.find({ author: userId }).exec();
    return lists;
  }

  async renameList(updateUserDto: UpdateTodoListDto) {
    const { _id: userId } = await this.usersServise.findUser(updateUserDto.author);
    const list = await this.todoList
      .findOneAndUpdate({ author: userId, _id: updateUserDto.id }, { title: updateUserDto.title })
      .exec();
    return list;
  }

  // TODO: add recursive remove todo list items
  async removeList(email: UserEmailDto, listId: string) {
    const { _id: userId } = await this.usersServise.findUser(email);
    const lists = await this.todoList.findByIdAndRemove({ author: userId, _id: listId }).exec();
    return lists;
  }
}
