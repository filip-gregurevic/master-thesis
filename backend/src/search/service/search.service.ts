import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search } from '../entity/search.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/service/user.service';
import { AttackService } from '../../attack/service/attack.service';
import { DefendService } from '../../defend/service/defend.service';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(Search)
    private readonly searchRepository: Repository<Search>,
    private readonly userService: UserService,
    private readonly attackService: AttackService,
    private readonly defendService: DefendService,
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

    const attack = await this.attackService.search(searchTerm);
    const defend = await this.defendService.search(searchTerm);

    const results = {
      attack,
      defend,
      total: attack.total + defend.total,
    };

    search.results = results.total;
    const savedSearch = await this.searchRepository.save(search);

    return { ...savedSearch, results };
  }

  async loadSearchById(searchId: number) {
    this.logger.debug(`Load search with id: ${searchId}`);

    const search = await this.searchRepository.findOneBy({ id: searchId });

    const attack = await this.attackService.search(search.searchTerm);
    const defend = await this.defendService.search(search.searchTerm);

    return {
      ...search,
      results: {
        attack,
        defend,
        total: attack.total + defend.total,
      },
    };
  }

  deleteById(searchId: number) {
    this.logger.debug(`Delete search with id: ${searchId}`);

    return this.searchRepository.delete(searchId);
  }
}
