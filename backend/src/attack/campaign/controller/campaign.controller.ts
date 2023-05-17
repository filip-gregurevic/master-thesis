import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { AttackCampaign } from '../entity/campaign.entity';
import { JWTAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guard/roles.guard';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { Role } from '../../../user/entity/role.enum';
import { AttackCampaignService } from '../service/campaign.service';

@UseGuards(JWTAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.User)
@Controller('attack-campaigns')
export class AttackCampaignController {
  private readonly logger = new Logger(AttackCampaignController.name);

  constructor(private readonly attackCampaignService: AttackCampaignService) {}

  @Get('/:campaignId')
  getCampaignById(
    @Param('campaignId') campaignId: number,
  ): Promise<AttackCampaign> {
    this.logger.log(`Get campaign with id: ${campaignId}`);

    return this.attackCampaignService.findById(campaignId);
  }
}
