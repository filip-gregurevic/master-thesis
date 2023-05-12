import { Module } from '@nestjs/common';
import { DefendArtifactModule } from './artifact/artifact.module';
import { DefendTacticModule } from './tactic/tactic.module';
import { DefendTechniqueModule } from './technique/technique.module';

@Module({
  imports: [DefendArtifactModule, DefendTacticModule, DefendTechniqueModule],
})
export class DefendModule {}
