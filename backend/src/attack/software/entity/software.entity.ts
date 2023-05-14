import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  })
  type: SoftwareType;

  techniques: AttackTechnique[];

  groups: AttackGroup[];
}
