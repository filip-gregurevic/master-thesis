import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttackTechnique } from '../../technique/entity/technique.entity';
import { JoinTable } from 'typeorm/browser';

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

  @ManyToMany(() => AttackTechnique)
  @JoinTable()
  techniques: AttackTechnique[];
}
