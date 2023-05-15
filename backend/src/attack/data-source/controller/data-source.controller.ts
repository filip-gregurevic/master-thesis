import { Controller, Logger } from '@nestjs/common';

@Controller('attack-data-sources')
export class AttackDataSourceController {
  private readonly logger = new Logger(AttackDataSourceController.name);
}
