import { Module } from '@nestjs/common';
import { AttackGroupModule } from './group/group.module';
import { AttackSoftwareModule } from './software/software.module';
import { AttackTechniqueModule } from './technique/technique.module';
import { AttackTacticModule } from './tactic/tactic.module';

@Module({
  imports: [
    AttackGroupModule,
    AttackSoftwareModule,
    AttackTacticModule,
    AttackTechniqueModule,
  ],
})
export class AttackModule {}
