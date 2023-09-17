import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { UserEmailDto } from 'src/users/dto/user-email.dto';
import {
  ApiTags,
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServise: AuthService) {}
  @ApiAcceptedResponse({ status: HttpStatus.OK, description: 'User email' })
  @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, description: 'User exist' })
  @UsePipes(new ValidationPipe())
  @Post('reg')
  async registration(@Body() dto: AuthDto): Promise<UserEmailDto> {
    return this.authServise.createUser(dto);
  }

  @ApiAcceptedResponse({ status: HttpStatus.OK, description: 'User email' })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User not found or wrong password',
  })
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const { email } = await this.authServise.validateUser(authDto);
    return this.authServise.login({ email });
  }

  @ApiAcceptedResponse({ status: HttpStatus.OK, description: 'Users list' })
  @ApiUnauthorizedResponse({ status: HttpStatus.BAD_REQUEST, description: 'Not authorized' })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getUsers(@UserEmail() userEmail: string) {
    console.log('userEmail: ', userEmail);
    return this.authServise.findAllUsers();
  }
}
