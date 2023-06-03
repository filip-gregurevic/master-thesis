import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class NLPSearch {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  sentence: string;

  @ManyToOne(() => User, (user) => user.nlpSearches)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
