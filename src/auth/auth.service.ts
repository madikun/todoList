import { Injectable } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
// import { UserModel } from './user.model';

@Injectable()
export class AuthService {
  async createUser(dto: AuthDto) {
    console.log(dto);
  }
  async findUserByEmail(email: string) {
    console.log(email);
  }
}
