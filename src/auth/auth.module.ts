import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TodoListModule } from 'src/todo-list/todo-list.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    TodoListModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
