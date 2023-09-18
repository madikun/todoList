import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { UserEmailDto } from './dto/user-email.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser({ email, passwordHash }: { email: string; passwordHash: string }) {
    const newUser = new this.userModel({ email, passwordHash });
    return newUser.save();
  }
  async findUser(email: UserEmailDto): Promise<UserDocument> {
    const res = await this.userModel.findOne({ email }).exec();
    console.log('res: ', res);
    return res;
  }

  async findAllUsers() {
    return this.userModel.find().exec();
  }
}
