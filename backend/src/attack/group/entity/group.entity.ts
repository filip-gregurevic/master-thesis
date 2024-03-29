import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttackTechnique } from '../../technique/entity/technique.entity';
import { AttackSoftware } from '../../software/entity/software.entity';

@Entity()
export class AttackGroup {
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

  techniques: AttackTechnique[];

  @ManyToMany(() => AttackSoftware)
  @JoinTable()
  software: AttackSoftware[];
}
