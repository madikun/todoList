import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser({ email, passwordHash }: { email: string; passwordHash: string }) {
    const newUser = new this.userModel({ email, passwordHash });
    return newUser.save();
  }
  async findUser(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAllUsers() {
    return this.userModel.find().exec();
  }
}
