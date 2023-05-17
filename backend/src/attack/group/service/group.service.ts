import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackGroup } from '../entity/group.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AttackGroupService {
  private readonly logger = new Logger(AttackGroupService.name);

  constructor(
    @InjectRepository(AttackGroup)
    private readonly attackGroupRepository: Repository<AttackGroup>,
  ) {}

  findById(groupId: number): Promise<AttackGroup> {
    this.logger.debug(`Find group with id: ${groupId}`);

    return this.attackGroupRepository.findOneBy({ id: groupId });
  }

  findBySearchTerm(searchTerm: string): Promise<AttackGroup[]> {
    this.logger.debug(
      `Find group with name or description containing: ${searchTerm}`,
    );

    return this.attackGroupRepository.find({
      where: [{ name: Like(searchTerm) }, { description: Like(searchTerm) }],
    });
  }
}
