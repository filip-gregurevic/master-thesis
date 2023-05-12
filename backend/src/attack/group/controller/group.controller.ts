import { Controller, Logger } from '@nestjs/common';

@Controller('attack-groups')
export class AttackGroupController {
  private readonly logger = new Logger(AttackGroupController.name);
}
