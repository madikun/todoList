import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { AUTH_EXCEPTIONS } from './auth.constants';
import { compare, genSalt, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TodoListService } from 'src/todo-list/todo-list.service';
import { UserEmailDto } from 'src/users/dto/user-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersServise: UsersService,
    private readonly jwtService: JwtService,
    private readonly todoListService: TodoListService,
  ) {}
  async createUser(dto: AuthDto): Promise<UserEmailDto> {
    const existUser = await this.usersServise.findUser(dto.email as unknown as UserEmailDto);
    if (existUser) throw new BadRequestException(AUTH_EXCEPTIONS.EXIST_USER_ERROR);
    const salt = await genSalt(10);
    const hash = await hashSync(dto.password, salt);
    const newUser = await this.usersServise.createUser({ email: dto.email, passwordHash: hash });
    const userEmail: UserEmailDto = newUser.toObject();
    await this.todoListService.createTodoList({
      title: '',
      list: [],
      createdAt: new Date(),
      author: userEmail,
    });

    return userEmail;
  }

  async findAllUsers() {
    return this.usersServise.findAllUsers();
  }

  async findUserByEmail(email: UserEmailDto) {
    return await this.usersServise.findUser(email);
  }

  async validateUser(authDto: AuthDto): Promise<Pick<AuthDto, 'email'>> {
    const user = await this.usersServise.findUser(authDto.email as unknown as UserEmailDto);
    if (!user) throw new BadRequestException(AUTH_EXCEPTIONS.NOT_FOUND_USER_ERROR);
    const isMatch = await compare(authDto.password, user.passwordHash);
    if (!isMatch) throw new BadRequestException(AUTH_EXCEPTIONS.WRONG_PASSWORD_ERROR);
    return { email: user.email };
  }

  async login({ email }: Pick<AuthDto, 'email'>) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
