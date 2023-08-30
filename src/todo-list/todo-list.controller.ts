import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { UserEmailDto } from 'src/users/dto/user-email.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}
  @Get('/')
  async getAll(@UserEmail() author: UserEmailDto) {
    return await this.todoListService.getByUser(author);
  }
  @Post('create')
  async create(@UserEmail() author: UserEmailDto, @Body() createTodoListDto: CreateTodoListDto) {
    return await this.todoListService.createTodoList({
      ...createTodoListDto,
      author,
      createdAt: new Date(),
    });
  }
}
