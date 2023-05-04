import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../user/entity/user.entity';
import { JWTPayload } from '../jwt.payload';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/service/user.service';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(JWTPayload: JWTPayload): Promise<User> {
    this.logger.debug(`Validate user with id: ${JWTPayload.id}`);

    return this.userService.findById(JWTPayload.id);
  }

  async login({
    email,
    password,
  }: LoginDto): Promise<{ user: User; access_token: string }> {
    this.logger.debug(`Login user with email: ${email}`);

    const user = await this.userService.findByEmailWithPassword(email);

    // check if user exists
    if (!user) {
      throw new NotFoundException();
    }
    // validate password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException();
    }
    // remove password after check
    delete user.password;

    // generate token
    const jwtPayload: JWTPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return Promise.resolve({
      user,
      access_token: this.jwtService.sign(jwtPayload),
    });
  }
}
