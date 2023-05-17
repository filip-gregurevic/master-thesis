import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AttackDataSourceService } from '../service/data-source.service';
import { AttackDataSource } from '../entity/data-source.entity';

@Controller('attack-data-sources')
export class AttackDataSourceController {
  private readonly logger = new Logger(AttackDataSourceController.name);

  constructor(
    private readonly attackDataSourceService: AttackDataSourceService,
  ) {}

  @Get('/:dataSourceId')
  getDataSourceById(
    @Param('dataSourceId') dataSourceId: number,
  ): Promise<AttackDataSource> {
    this.logger.log(`Get data source with id: ${dataSourceId}`);

    return this.attackDataSourceService.findById(dataSourceId);
  }
}
