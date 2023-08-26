import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  login: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
