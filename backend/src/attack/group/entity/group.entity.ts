import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttackGroup {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;
}
