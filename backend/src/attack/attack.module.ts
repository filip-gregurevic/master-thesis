import { Module } from '@nestjs/common';
import { AttackGroupModule } from './group/group.module';
import { AttackSoftwareModule } from './software/software.module';
import { AttackTechniqueModule } from './technique/technique.module';
import { AttackTacticModule } from './tactic/tactic.module';
import { AttackMitigation } from './mitigation/entity/mitigation.entity';
import { AttackCampaignModule } from './campaign/campaign.module';
import { AttackDataSourceModule } from './data-source/data-source.module';

@Module({
  imports: [
    AttackCampaignModule,
    AttackDataSourceModule,
    AttackGroupModule,
    AttackMitigation,
    AttackSoftwareModule,
    AttackTacticModule,
    AttackTechniqueModule,
  ],
})
export class AttackModule {}
