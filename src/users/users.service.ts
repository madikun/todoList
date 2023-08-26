import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(userDto: { email: string; password: string }) {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }
  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
