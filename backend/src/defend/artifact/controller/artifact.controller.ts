import { Controller, Get, Logger, Param } from '@nestjs/common';
import { DefendArtifactService } from '../service/artifact.service';
import { DefendArtifact } from '../entity/artifact.entity';

@Controller('defend-artifacts')
export class DefendArtifactController {
  private readonly logger = new Logger(DefendArtifactController.name);

  constructor(private readonly defendArtifactService: DefendArtifactService) {}

  @Get('/:artifactId')
  getArtifactById(
    @Param('artifactId') artifactId: number,
  ): Promise<DefendArtifact> {
    this.logger.log(`Get artifact with id: ${artifactId}`);

    return this.defendArtifactService.findById(artifactId);
  }
}
