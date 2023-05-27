import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttackTactic } from '../../tactic/entity/tactic.entity';

@Entity()
export class AttackTechnique {
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

  @ManyToOne(() => AttackTactic)
  tactic: AttackTactic;

  @ManyToOne(
    () => AttackTechnique,
    (attackTechnique) => attackTechnique.subTechniques,
  )
  parentTechnique: AttackTechnique;

  @OneToMany(
    () => AttackTechnique,
    (attackTechnique) => attackTechnique.parentTechnique,
  )
  subTechniques: AttackTechnique[];
}
