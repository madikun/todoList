import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/models/user.model';
import { TodoItem } from './todo-item.model';

export type TodoListDocument = HydratedDocument<TodoList>;

@Schema()
export class TodoList {
  @Prop()
  title: string;
  @Prop()
  list: TodoItem[];
  @Prop()
  createdAt: Date;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  author: Pick<User, 'email'>;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
