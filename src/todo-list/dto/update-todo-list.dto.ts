import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEmailDto } from 'src/users/dto/user-email.dto';

export class UpdateTodoListDto {
  @IsNotEmpty()
  id: string;
  @IsString()
  title?: string;
  @IsNotEmpty()
  @IsEmail()
  author: UserEmailDto;
}
