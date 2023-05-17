import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AttackMitigationService } from '../service/mitigation.service';
import { AttackMitigation } from '../entity/mitigation.entity';

@Controller('attack-mitigations')
export class AttackMitigationController {
  private readonly logger = new Logger(AttackMitigationController.name);

  constructor(
    private readonly attackMitigationService: AttackMitigationService,
  ) {}

  @Get('/:mitigationId')
  getMitigationById(
    @Param('mitigationId') mitigationId: number,
  ): Promise<AttackMitigation> {
    this.logger.log(`Get mitigation with id: ${mitigationId}`);

    return this.attackMitigationService.findById(mitigationId);
  }
}
