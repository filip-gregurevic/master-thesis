import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackSoftware } from '../entity/software.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AttackSoftwareService {
  private readonly logger = new Logger(AttackSoftwareService.name);

  constructor(
    @InjectRepository(AttackSoftware)
    private readonly attackSoftwareRepository: Repository<AttackSoftware>,
  ) {}

  findById(groupId: number): Promise<AttackSoftware> {
    this.logger.debug(`Find software with id: ${groupId}`);

    return this.attackSoftwareRepository.findOneBy({ id: groupId });
  }

  findBySearchTerm(searchTerm: string): Promise<AttackSoftware[]> {
    this.logger.debug(
      `Find software with name or description containing: ${searchTerm}`,
    );

    return this.attackSoftwareRepository.find({
      where: [
        { name: Like(`%${searchTerm}%`) },
        { description: Like(`%${searchTerm}%`) },
      ],
    });
  }
}
