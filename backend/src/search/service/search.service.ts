import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search } from '../entity/search.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/service/user.service';
import { AttackService } from '../../attack/service/attack.service';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(Search)
    private readonly searchRepository: Repository<Search>,
    private readonly userService: UserService,
    private readonly attackService: AttackService,
  ) {}

  findByUserId(userId: number): Promise<Search[]> {
    this.logger.debug(`Find searches by userId: ${userId}`);

    return this.searchRepository.find({ where: { user: { id: userId } } });
  }

  async performSearch(userId: number, searchTerm: string) {
    this.logger.debug(
      `Perform search for ${searchTerm} for user with id ${userId}`,
    );

    const user = await this.userService.findById(userId);

    const search = this.searchRepository.create();
    search.searchTerm = searchTerm;
    search.user = user;

    await this.searchRepository.save(search);

    return {
      attack: await this.attackService.search(searchTerm),
    };
  }

  deleteById(searchId: number) {
    this.logger.debug(`Delete search with id: ${searchId}`);

    return this.searchRepository.delete(searchId);
  }
}
