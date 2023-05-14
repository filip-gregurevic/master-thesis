import { Controller, Logger } from '@nestjs/common';

@Controller('attack-mitigations')
export class AttackMitigationController {
  private readonly logger = new Logger(AttackMitigationController.name);
}
