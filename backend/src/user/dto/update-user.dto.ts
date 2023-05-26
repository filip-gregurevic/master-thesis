import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from '../entity/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
  role: Role;
}
