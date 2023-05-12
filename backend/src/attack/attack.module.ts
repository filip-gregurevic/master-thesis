import { Module } from '@nestjs/common';
import { AttackGroupModule } from './group/group.module';
import { AttackSoftwareModule } from './software/software.module';
import { AttackTechniqueModule } from './technique/technique.module';

@Module({
  imports: [AttackGroupModule, AttackSoftwareModule, AttackTechniqueModule],
})
export class AttackModule {}
