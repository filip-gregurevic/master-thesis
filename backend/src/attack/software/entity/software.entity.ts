import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SoftwareType } from './softwareType.enum';
import { AttackTechnique } from '../../technique/entity/technique.entity';
import { AttackGroup } from '../../group/entity/group.entity';

@Entity()
export class AttackSoftware {
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

  @Column({
    type: 'enum',
    enum: SoftwareType,
  })
  type: SoftwareType;

  @ManyToMany(() => AttackTechnique)
  @JoinTable()
  techniques: AttackTechnique[];

  @ManyToMany(() => AttackGroup)
  @JoinTable()
  groups: AttackGroup[];
}
