import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEmailDto } from 'src/users/dto/user-email.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoListDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsEmail()
  author: UserEmailDto;
}
