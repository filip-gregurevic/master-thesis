import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackTactic } from '../entity/tactic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttackTacticService {
  private readonly logger = new Logger(AttackTacticService.name);

  constructor(
    @InjectRepository(AttackTactic)
    private readonly attackTacticRepository: Repository<AttackTactic>,
  ) {}
}
