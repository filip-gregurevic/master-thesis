import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackTactic } from '../entity/tactic.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AttackTacticService {
  private readonly logger = new Logger(AttackTacticService.name);

  constructor(
    @InjectRepository(AttackTactic)
    private readonly attackTacticRepository: Repository<AttackTactic>,
  ) {}

  findById(groupId: number): Promise<AttackTactic> {
    this.logger.debug(`Find tactic with id: ${groupId}`);

    return this.attackTacticRepository.findOneBy({ id: groupId });
  }

  findBySearchTerm(searchTerm: string): Promise<AttackTactic[]> {
    this.logger.debug(
      `Find tactic with name or description containing: ${searchTerm}`,
    );

    return this.attackTacticRepository.find({
      where: [{ name: Like(searchTerm) }, { description: Like(searchTerm) }],
    });
  }
}
