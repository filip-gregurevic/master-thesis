import { Body, Controller, Logger, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    this.logger.log(`Login user with email: ${loginDto.email}`);

    return this.authService.login(loginDto);
  }
}
