import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { AUTH_EXCEPTIONS } from './auth.constants';
import { compare, genSalt, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersServise: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(dto: AuthDto): Promise<string> {
    const existUser = await this.usersServise.findUser(dto.email);
    if (existUser) throw new BadRequestException(AUTH_EXCEPTIONS.EXIST_USER_ERROR);
    const salt = await genSalt(10);
    const hash = await hashSync(dto.password, salt);
    const newUser = await this.usersServise.createUser({ email: dto.email, passwordHash: hash });
    return newUser.email;
  }

  async findAllUsers() {
    return this.usersServise.findAllUsers();
  }

  async findUserByEmail(email: string) {
    console.log(email);
  }

  async validateUser(authDto: AuthDto): Promise<Pick<AuthDto, 'email'>> {
    const user = await this.usersServise.findUser(authDto.email);
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
