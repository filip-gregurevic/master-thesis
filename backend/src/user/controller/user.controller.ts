import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JWTAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Role } from '../entity/role.enum';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Get('')
  async getUsers(): Promise<User[]> {
    this.logger.log('Get all users');

    return this.userService.findAll();
  }

  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Create user with email: ${createUserDto.email}`);

    return this.userService.create(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin, Role.User)
  @Get('/:userId')
  async getUserById(
    @Param('userId') userId: number,
    @Req() req,
  ): Promise<User> {
    this.logger.log(`Get user with id: ${userId}`);

    // check if user has access
    const isOnlyUser = req.user.role === Role.User;
    if (isOnlyUser && req.user._id.toString() !== userId) {
      this.logger.error(
        `User with id ${req.user.id} failed accessing user profile`,
      );
      throw new ForbiddenException('Users can only view their own profile');
    }

    return this.userService.findById(userId);
  }

  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Patch('/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.logger.log(`Update user with id: ${userId}`);

    return this.userService.updateById(userId, updateUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: number): Promise<any> {
    this.logger.log(`Delete user with id: ${userId}`);

    return this.userService.deleteById(userId);
  }

  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Register user with email: ${createUserDto.email}`);

    return this.userService.create(createUserDto);
  }
}
