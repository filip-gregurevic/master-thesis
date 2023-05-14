import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackMitigation } from '../entity/mitigation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttackMitigationService {
  private readonly logger = new Logger(AttackMitigationService.name);

  constructor(
    @InjectRepository(AttackMitigation)
    private readonly attackMitigationRepository: Repository<AttackMitigation>,
  ) {}
}
