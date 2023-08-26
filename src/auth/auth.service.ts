import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { AUTH_EXCEPTIONS } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(private readonly usersServise: UsersService) {}
  async createUser(dto: AuthDto) {
    const existUser = await this.usersServise.findUser(dto.email);
    if (existUser) throw new BadRequestException(AUTH_EXCEPTIONS.EXIST_USER_ERROR);
    return this.usersServise.createUser(dto);
  }

  async findAllUsers() {
    return this.usersServise.findAllUsers();
  }

  async findUserByEmail(email: string) {
    console.log(email);
  }
}
