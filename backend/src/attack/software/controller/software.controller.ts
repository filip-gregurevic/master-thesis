import { Controller, Logger } from '@nestjs/common';

@Controller('attack-software')
export class AttackSoftwareController {
  private readonly logger = new Logger(AttackSoftwareController.name);
}
