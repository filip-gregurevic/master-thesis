import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefendArtifact } from './entity/artifact.entity';
import { DefendArtifactController } from './controller/artifact.controller';
import { DefendArtifactService } from './service/artifact.service';

@Module({
  imports: [TypeOrmModule.forFeature([DefendArtifact])],
  controllers: [DefendArtifactController],
  providers: [DefendArtifactService],
  exports: [DefendArtifactService],
})
export class DefendArtifactModule {}
