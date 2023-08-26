import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from './user.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModel],
})
export class AuthModule {}
