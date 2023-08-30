import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { TodoList } from './todo-list.model';

export type TodoItemDocument = HydratedDocument<TodoItem>;

@Schema()
export class TodoItem {
  @Prop()
  title: string;
  @Prop()
  text: string;
  @Prop()
  createdAt: Date;
  @Prop({ default: false })
  isDone: boolean;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: TodoList.name })
  list: TodoList;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
