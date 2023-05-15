import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackDataSource } from '../entity/data-source.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttackDataSourceService {
  private readonly logger = new Logger(AttackDataSourceService.name);

  constructor(
    @InjectRepository(AttackDataSource)
    private readonly attackDataSourceRepository: Repository<AttackDataSource>,
  ) {}
}
