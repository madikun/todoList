import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { UserEmailDto } from 'src/users/dto/user-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServise: AuthService) {}
  @UsePipes(new ValidationPipe())
  @Post('reg')
  async registration(@Body() dto: AuthDto): Promise<UserEmailDto> {
    return this.authServise.createUser(dto);
  }
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const { email } = await this.authServise.validateUser(authDto);
    return this.authServise.login({ email });
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getUsers(@UserEmail() userEmail: string) {
    console.log('userEmail: ', userEmail);
    return this.authServise.findAllUsers();
  }
}
