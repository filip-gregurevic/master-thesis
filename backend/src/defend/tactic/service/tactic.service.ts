import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefendTactic } from '../entity/tactic.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class DefendTacticService {
  private readonly logger = new Logger(DefendTacticService.name);

  constructor(
    @InjectRepository(DefendTactic)
    private readonly defendTacticRepository: Repository<DefendTactic>,
  ) {}

  findById(tacticId: number): Promise<DefendTactic> {
    this.logger.debug(`Find tactic with id: ${tacticId}`);

    return this.defendTacticRepository.findOneBy({ id: tacticId });
  }

  findBySearchTerm(searchTerm: string): Promise<DefendTactic[]> {
    this.logger.debug(`Find tactic with name containing: ${searchTerm}`);

    return this.defendTacticRepository.find({
      where: [{ name: Like(searchTerm) }],
    });
  }
}
