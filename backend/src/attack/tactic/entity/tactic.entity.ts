import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttackTactic {
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
}
