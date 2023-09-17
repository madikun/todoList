import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/models/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class UserEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: Pick<User, 'email'>;
}
