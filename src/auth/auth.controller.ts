import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServise: AuthService) {}
  @UsePipes(new ValidationPipe())
  @Post('reg')
  async registration(@Body() dto: AuthDto) {
    return this.authServise.createUser(dto);
  }
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const { email } = await this.authServise.validateUser(authDto);
    return this.authServise.login({ email });
  }

  @Get('all')
  async getUsers() {
    return this.authServise.findAllUsers();
  }
}
