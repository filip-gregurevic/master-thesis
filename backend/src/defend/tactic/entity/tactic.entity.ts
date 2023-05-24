import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DefendTactic {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  name: string;
}
