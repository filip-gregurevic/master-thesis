import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DefendTactic } from './defendTactic.enum';

@Entity()
export class DefendTechnique {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ unique: true })
  mitreId: string;

  @Column()
  name: string;

  @Column()
  definition: string;

  @Column({ type: 'enum', enum: DefendTactic })
  tactic: DefendTactic;
}
