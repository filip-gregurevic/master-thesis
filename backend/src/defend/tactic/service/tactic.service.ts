import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefendTactic } from '../entity/tactic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DefendTacticService {
  private readonly logger = new Logger(DefendTacticService.name);

  constructor(
    @InjectRepository(DefendTactic)
    private readonly defendTacticRepository: Repository<DefendTactic>,
  ) {}
}
