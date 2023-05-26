import {
  Body,
  ConflictException,
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
import { RolesGuard } from '../../auth/guard/roles.guard';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('')
  async getUsers(): Promise<User[]> {
    this.logger.log('Get all users');

    return this.userService.findAll();
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Create user with email: ${createUserDto.email}`);

    return this.userService.create(createUserDto);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('/:userId')
  async getUserById(
    @Param('userId') userId: number,
    @Req() req,
  ): Promise<User> {
    this.logger.log(`Get user with id: ${userId}`);

    // check if user has access
    const isOnlyUser = req.user.role === Role.User;
    if (isOnlyUser && req.user.id.toString() !== userId) {
      this.logger.error(
        `User with id ${req.user.id} failed accessing user profile`,
      );
      throw new ForbiddenException('Users can only view their own profile');
    }

    return this.userService.findById(userId);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Patch('/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.logger.log(`Update user with id: ${userId}`);

    // check if user has access
    const isOnlyUser = req.user.role === Role.User;
    if (isOnlyUser && req.user.id.toString() !== userId) {
      this.logger.error(
        `User with id ${req.user.id} failed updating user profile`,
      );
      throw new ForbiddenException('Users can only update their own profile');
    }

    return this.userService.updateById(userId, updateUserDto);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: number, @Req() req): Promise<any> {
    this.logger.log(`Delete user with id: ${userId}`);

    // check if user has access
    const isOnlyUser = req.user.role === Role.User;
    if (isOnlyUser && req.user.id.toString() !== userId) {
      this.logger.error(
        `User with id ${req.user.id} failed deleting user profile`,
      );
      throw new ForbiddenException('Users can only delete their own profile');
    }

    return this.userService.deleteById(userId);
  }

  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Register user with email: ${createUserDto.email}`);

    // check if email already in use
    const user = await this.userService.findByEmailWithPassword(
      createUserDto.email,
    );
    if (user) {
      this.logger.error(`User with ${createUserDto.email} already exists`);
      throw new ConflictException(
        `User with ${createUserDto.email} already exists`,
      );
    }

    return this.userService.create(createUserDto);
  }
}
