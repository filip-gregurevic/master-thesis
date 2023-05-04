import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    default: Role.User,
  })
  role: Role;
}
