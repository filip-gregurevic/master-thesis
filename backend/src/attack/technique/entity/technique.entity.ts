import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttackTechnique {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;
}
