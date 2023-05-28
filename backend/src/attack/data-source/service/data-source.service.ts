import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackDataSource } from '../entity/data-source.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class AttackDataSourceService {
  private readonly logger = new Logger(AttackDataSourceService.name);

  constructor(
    @InjectRepository(AttackDataSource)
    private readonly attackDataSourceRepository: Repository<AttackDataSource>,
  ) {}

  findById(dataSourceId: number): Promise<AttackDataSource> {
    this.logger.debug(`Find data source with id: ${dataSourceId}`);

    return this.attackDataSourceRepository.findOneBy({ id: dataSourceId });
  }

  findBySearchTerm(searchTerm: string): Promise<AttackDataSource[]> {
    this.logger.debug(
      `Find data source with name or description containing: ${searchTerm}`,
    );

    return this.attackDataSourceRepository.find({
      where: [{ name: ILike(searchTerm) }, { description: ILike(searchTerm) }],
    });
  }
}
