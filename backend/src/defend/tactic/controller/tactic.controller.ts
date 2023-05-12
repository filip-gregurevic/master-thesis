import { Controller, Logger } from '@nestjs/common';

@Controller('defend-tactics')
export class DefendTacticController {
  private readonly logger = new Logger(DefendTacticController.name);
}
