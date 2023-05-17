import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AttackSoftwareService } from '../service/software.service';
import { AttackSoftware } from '../entity/software.entity';

@Controller('attack-software')
export class AttackSoftwareController {
  private readonly logger = new Logger(AttackSoftwareController.name);

  constructor(private readonly attackSoftwareService: AttackSoftwareService) {}

  @Get('/:softwareId')
  getSoftwareById(
    @Param('softwareId') softwareId: number,
  ): Promise<AttackSoftware> {
    this.logger.log(`Get software with id: ${softwareId}`);

    return this.attackSoftwareService.findById(softwareId);
  }
}
