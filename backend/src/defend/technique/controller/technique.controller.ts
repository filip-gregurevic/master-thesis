import { Controller, Logger } from '@nestjs/common';

@Controller('defend-techniques')
export class DefendTechniqueController {
  private readonly logger = new Logger(DefendTechniqueController.name);
}
