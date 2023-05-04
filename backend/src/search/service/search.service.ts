import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search } from '../entity/search.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(Search)
    private readonly searchRepository: Repository<Search>,
  ) {}
}
