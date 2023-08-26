import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodoListModule } from './todo-list/todo-list.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mongo'),
    AuthModule,
    UsersModule,
    TodoListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
