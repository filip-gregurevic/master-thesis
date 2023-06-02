import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class NLPSearch {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.searches)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
