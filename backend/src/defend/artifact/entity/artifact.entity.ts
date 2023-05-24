import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DefendArtifact {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  name: string;
}
