import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackTechnique } from '../entity/technique.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttackTechniqueService {
  private readonly logger = new Logger(AttackTechniqueService.name);

  constructor(
    @InjectRepository(AttackTechnique)
    private readonly attackTechniqueRepository: Repository<AttackTechnique>,
  ) {}
}
