import { Controller, Get, Logger, Param } from '@nestjs/common';
import { DefendTacticService } from '../service/tactic.service';
import { DefendTactic } from '../entity/tactic.entity';

@Controller('defend-tactics')
export class DefendTacticController {
  private readonly logger = new Logger(DefendTacticController.name);

  constructor(private readonly defendTacticService: DefendTacticService) {}

  @Get('/:tacticId')
  getTacticById(@Param('tacticId') tacticId: number): Promise<DefendTactic> {
    this.logger.log(`Get tactic with id: ${tacticId}`);

    return this.defendTacticService.findById(tacticId);
  }
}
