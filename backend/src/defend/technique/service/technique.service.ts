import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefendTechnique } from '../entity/technique.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DefendTechniqueService {
  private readonly logger = new Logger(DefendTechniqueService.name);

  constructor(
    @InjectRepository(DefendTechnique)
    private readonly defendTechniqueRepository: Repository<DefendTechnique>,
  ) {}
}
