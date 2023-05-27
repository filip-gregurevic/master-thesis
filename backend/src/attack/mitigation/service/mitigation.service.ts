import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackMitigation } from '../entity/mitigation.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AttackMitigationService {
  private readonly logger = new Logger(AttackMitigationService.name);

  constructor(
    @InjectRepository(AttackMitigation)
    private readonly attackMitigationRepository: Repository<AttackMitigation>,
  ) {}

  findById(mitigationId: number): Promise<AttackMitigation> {
    this.logger.debug(`Find mitigation with id: ${mitigationId}`);

    return this.attackMitigationRepository.findOneBy({ id: mitigationId });
  }

  findBySearchTerm(searchTerm: string): Promise<AttackMitigation[]> {
    this.logger.debug(
      `Find mitigation with name or description containing: ${searchTerm}`,
    );

    return this.attackMitigationRepository.find({
      where: [
        { name: Like(`%${searchTerm}%`) },
        { description: Like(`%${searchTerm}%`) },
      ],
    });
  }
}
