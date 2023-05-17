import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AttackTacticService } from '../service/tactic.service';
import { AttackTactic } from '../entity/tactic.entity';

@Controller('attack-tactics')
export class AttackTacticController {
  private readonly logger = new Logger(AttackTacticController.name);

  constructor(private readonly attackTacticService: AttackTacticService) {}

  @Get('/:tacticId')
  getTacticById(@Param('tacticId') tacticId: number): Promise<AttackTactic> {
    this.logger.log(`Get software with id: ${tacticId}`);

    return this.attackTacticService.findById(tacticId);
  }
}
