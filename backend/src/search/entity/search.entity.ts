import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Search {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;
}
