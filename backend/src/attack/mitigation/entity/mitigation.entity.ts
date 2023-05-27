import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttackTechnique } from '../../technique/entity/technique.entity';

@Entity()
export class AttackMitigation {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ unique: true })
  mitreId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @ManyToMany(() => AttackTechnique)
  @JoinTable()
  techniques: AttackTechnique[];
}
