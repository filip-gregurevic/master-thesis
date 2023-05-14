import { Controller, Logger } from '@nestjs/common';

@Controller('attack-tactics')
export class AttackTacticController {
  private readonly logger = new Logger(AttackTacticController.name);
}
