import { Module } from '@nestjs/common';
import { AttackGroupModule } from './group/group.module';
import { AttackSoftwareModule } from './software/software.module';
import { AttackTechniqueModule } from './technique/technique.module';
import { AttackTacticModule } from './tactic/tactic.module';
import { AttackCampaignModule } from './campaign/campaign.module';
import { AttackDataSourceModule } from './data-source/data-source.module';
import { AttackService } from './service/attack.service';
import { MitigationModule } from './mitigation/mitigation.module';

@Module({
  imports: [
    AttackCampaignModule,
    AttackDataSourceModule,
    AttackGroupModule,
    MitigationModule,
    AttackSoftwareModule,
    AttackTacticModule,
    AttackTechniqueModule,
  ],
  providers: [AttackService],
  exports: [AttackService],
})
export class AttackModule {}
