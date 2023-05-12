import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttackSoftware {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;
}
