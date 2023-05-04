import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../user/entity/user.entity';
import { JWTPayload } from '../jwt.payload';
import { UserService } from '../../user/service/user.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  validateUser(JWTPayload: JWTPayload): Promise<User> {
    this.logger.debug(`Validate user with id: ${JWTPayload.id}`);

    return this.userService.findById(JWTPayload.id);
  }

  async login({ email, password }: LoginDto) {
    const user = this.userService.findByEmail(email);

    // validate password
    if (user) return user;
  }
}
