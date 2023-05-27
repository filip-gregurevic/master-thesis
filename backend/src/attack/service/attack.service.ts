import { Injectable, Logger } from '@nestjs/common';
import { AttackCampaignService } from '../campaign/service/campaign.service';
import { AttackDataSourceService } from '../data-source/service/data-source.service';
import { AttackGroupService } from '../group/service/group.service';
import { AttackMitigationService } from '../mitigation/service/mitigation.service';
import { AttackSoftwareService } from '../software/service/software.service';
import { AttackTacticService } from '../tactic/service/tactic.service';
import { AttackTechniqueService } from '../technique/service/technique.service';

@Injectable()
export class AttackService {
  private readonly logger = new Logger(AttackService.name);

  constructor(
    private readonly attackCampaignService: AttackCampaignService,
    private readonly attackDataSourceService: AttackDataSourceService,
    private readonly attackGroupService: AttackGroupService,
    private readonly attackMitigationService: AttackMitigationService,
    private readonly attackSoftwareService: AttackSoftwareService,
    private readonly attackTacticService: AttackTacticService,
    private readonly attackTechniqueService: AttackTechniqueService,
  ) {}

  async search(searchTerm: string) {
    this.logger.debug(`Search mitre attack for ${searchTerm}`);

    const campaigns = await this.attackCampaignService.findBySearchTerm(
      searchTerm,
    );
    const groups = await this.attackGroupService.findBySearchTerm(searchTerm);
    const mitigations = await this.attackMitigationService.findBySearchTerm(
      searchTerm,
    );
    const software = await this.attackSoftwareService.findBySearchTerm(
      searchTerm,
    );
    const tactics = await this.attackTacticService.findBySearchTerm(searchTerm);
    const techniques = await this.attackTechniqueService.findBySearchTerm(
      searchTerm,
    );

    return {
      campaigns,
      campaignsTotal: campaigns.length,
      dataSources: await this.attackDataSourceService.findBySearchTerm(
        searchTerm,
      ),
      groups,
      groupsTotal: groups.length,
      mitigations,
      mitigationsTotal: mitigations.length,
      software,
      softwareTotal: software.length,
      tactics,
      tacticsTotal: tactics.length,
      techniques,
      techniquesTotal: techniques.length,
      total:
        campaigns.length +
        groups.length +
        mitigations.length +
        software.length +
        tactics.length +
        techniques.length,
    };
  }
}
