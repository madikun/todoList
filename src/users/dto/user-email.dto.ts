import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/models/user.model';

export class UserEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: Pick<User, 'email'>;
}
