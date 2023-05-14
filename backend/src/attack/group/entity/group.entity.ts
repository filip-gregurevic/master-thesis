import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttackGroup {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  name: string;
}
