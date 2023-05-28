import { Injectable, Logger } from '@nestjs/common';
import { DefendArtifactService } from '../artifact/service/artifact.service';
import { DefendTacticService } from '../tactic/service/tactic.service';
import { DefendTechniqueService } from '../technique/service/technique.service';

@Injectable()
export class DefendService {
  private readonly logger = new Logger(DefendService.name);

  constructor(
    private readonly defendArtifactService: DefendArtifactService,
    private readonly defendTacticService: DefendTacticService,
    private readonly defendTechniqueService: DefendTechniqueService,
  ) {}

  async search(searchTerm: string) {
    this.logger.debug(`Search MITRE D3FEND for ${searchTerm}`);

    const techniques = await this.defendTechniqueService.findBySearchTerm(
      searchTerm,
    );

    return {
      techniques,
      techniquesTotal: techniques.length,
      total: techniques.length,
    };
  }
}
