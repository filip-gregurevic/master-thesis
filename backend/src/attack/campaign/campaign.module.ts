import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackCampaign } from './entity/campaign.entity';
import { AttackCampaignController } from './controller/campaign.controller';
import { AttackCampaignService } from './service/campaign.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttackCampaign])],
  controllers: [AttackCampaignController],
  providers: [AttackCampaignService],
  exports: [AttackCampaignService],
})
export class AttackCampaignModule {}
