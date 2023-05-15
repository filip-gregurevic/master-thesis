import { Controller, Logger } from '@nestjs/common';

@Controller('attack-campaigns')
export class AttackCampaignController {
  private readonly logger = new Logger(AttackCampaignController.name);
}
