import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(userDto: AuthDto) {
    console.log('userDto: ', userDto);
    const salt = await genSaltSync(10);
    const hash = await hashSync(userDto.password, salt);
    const newUser = new this.userModel({
      email: userDto.email,
      passwordHash: hash,
    });
    return newUser.save();
  }
  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findAllUsers() {
    return this.userModel.find().exec();
  }
}
