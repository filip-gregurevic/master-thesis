import { Controller, Logger } from '@nestjs/common';

@Controller('attack-techniques')
export class AttackTechniqueController {
  private readonly logger = new Logger(AttackTechniqueController.name);
}
