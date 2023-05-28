import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackTechnique } from '../entity/technique.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class AttackTechniqueService {
  private readonly logger = new Logger(AttackTechniqueService.name);

  constructor(
    @InjectRepository(AttackTechnique)
    private readonly attackTechniqueRepository: Repository<AttackTechnique>,
  ) {}

  findById(groupId: number): Promise<AttackTechnique> {
    this.logger.debug(`Find technique with id: ${groupId}`);

    return this.attackTechniqueRepository.findOneBy({ id: groupId });
  }

  findBySearchTerm(searchTerm: string): Promise<AttackTechnique[]> {
    this.logger.debug(
      `Find techniqu with name or description containing: ${searchTerm}`,
    );

    return this.attackTechniqueRepository.find({
      where: [
        { name: ILike(`%${searchTerm}%`) },
        { description: ILike(`%${searchTerm}%`) },
      ],
    });
  }
}
