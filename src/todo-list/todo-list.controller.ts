import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { UserEmailDto } from 'src/users/dto/user-email.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemsDto } from './dto/update-todo-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}
  @Get('list')
  async getAll(@UserEmail() author: UserEmailDto) {
    return await this.todoListService.getListByUser(author);
  }

  @Post('create/list')
  async createList(
    @UserEmail() author: UserEmailDto,
    @Body() createTodoListDto: CreateTodoListDto,
  ) {
    return await this.todoListService.createList({
      ...createTodoListDto,
      author,
      createdAt: new Date(),
    });
  }

  @Patch('list/:id')
  async update(
    @UserEmail() author: UserEmailDto,
    @Body() updateTodoListDto: UpdateTodoListDto,
    @Param('id') id: string,
  ) {
    return await this.todoListService.renameList({
      ...updateTodoListDto,
      id: id,
      author,
    });
  }

  @Post('create/item/:id?')
  async addItemToList(
    @UserEmail() author: UserEmailDto,
    @Body() createTodoItemDto: CreateTodoItemDto,
    @Param('id') listId?: string,
  ) {
    return await this.todoListService.addItemToList(author, { ...createTodoItemDto, list: listId });
  }

  @Patch('update-items/:id')
  async updateListItem(
    @UserEmail() author: UserEmailDto,
    @Body() updateTodoItemsDto: UpdateTodoItemsDto['list'],
    @Param('id') listId: string,
  ) {
    return await this.todoListService.updateItemToList(author, {
      list: updateTodoItemsDto,
      listId: listId,
    });
  }
}
