import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Search {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  searchTerm: string;

  @Column()
  results: number;

  @ManyToOne(() => User, (user) => user.searches)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
