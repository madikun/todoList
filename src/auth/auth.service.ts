import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';

@Injectable()
export class AuthService {
  constructor(private readonly userModel: typeof UserModel) {} // TODO @InjectModel(UserModel) private readonly userModel: typeof UserModel
  async createUser(dto: AuthDto) {
    console.log(dto);
  }
  async findUserByEmail(email: string) {
    console.log(email);
  }
}
