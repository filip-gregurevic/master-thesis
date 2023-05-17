import { Module } from '@nestjs/common';
import { DefendArtifactModule } from './artifact/artifact.module';
import { DefendTacticModule } from './tactic/tactic.module';
import { DefendTechniqueModule } from './technique/technique.module';
import { DefendService } from './service/defend.service';

@Module({
  imports: [DefendArtifactModule, DefendTacticModule, DefendTechniqueModule],
  providers: [DefendService],
  exports: [DefendService],
})
export class DefendModule {}
