import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';
import { Search } from '../../search/entity/search.entity';
import { NLPSearch } from '../../nlp/entity/nlp-search.entity';
import { Conversation } from '../../chat-gpt/entity/conversation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => Search, (search) => search.user)
  searches: Search[];

  @OneToMany(() => NLPSearch, (nlpSearch) => nlpSearch.user)
  nlpSearches: NLPSearch[];

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversation: Conversation[];
}
