import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    this.logger.debug('Find all users');

    return this.userRepository.find();
  }

  findById(userId: number): Promise<User> {
    this.logger.debug(`Find user with id: ${userId}`);

    return this.userRepository.findOneBy({ id: userId });
  }

  findByEmailWithPassword(email: string): Promise<User> {
    this.logger.debug(`Find user with email: ${email}`);

    return this.userRepository.findOne({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });
  }

  /**
   * creates a user and hashes the password
   *
   * @param {CreateUserDto} createUserDto user to create
   * @return {Promise<User>} created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug(`Create user with email: ${createUserDto.email}`);
    // hash password
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  updateById(userId: number, updateUserDto: UpdateUserDto) {
    this.logger.debug(`Update user with id: ${updateUserDto.id}`);

    return this.userRepository.update(userId, updateUserDto);
  }

  deleteById(userId: number) {
    this.logger.debug(`Delete user with id: ${userId}`);

    return this.userRepository.delete(userId);
  }
}
