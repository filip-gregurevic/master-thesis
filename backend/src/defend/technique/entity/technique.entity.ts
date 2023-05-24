import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DefendTechnique {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  name: string;
}
