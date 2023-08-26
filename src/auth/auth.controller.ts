import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    console.log(dto);
  }
}
