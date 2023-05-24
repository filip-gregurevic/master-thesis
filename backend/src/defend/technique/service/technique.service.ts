import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefendTechnique } from '../entity/technique.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class DefendTechniqueService {
  private readonly logger = new Logger(DefendTechniqueService.name);

  constructor(
    @InjectRepository(DefendTechnique)
    private readonly defendTechniqueRepository: Repository<DefendTechnique>,
  ) {}

  findById(techniqueId: number): Promise<DefendTechnique> {
    this.logger.debug(`Find technique with id: ${techniqueId}`);

    return this.defendTechniqueRepository.findOneBy({ id: techniqueId });
  }

  findBySearchTerm(searchTerm: string): Promise<DefendTechnique[]> {
    this.logger.debug(`Find technique with name containing: ${searchTerm}`);

    return this.defendTechniqueRepository.find({
      where: [{ name: Like(searchTerm) }],
    });
  }
}
