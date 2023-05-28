import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackCampaign } from '../entity/campaign.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class AttackCampaignService {
  private readonly logger = new Logger(AttackCampaignService.name);

  constructor(
    @InjectRepository(AttackCampaign)
    private readonly attackCampaignRepository: Repository<AttackCampaign>,
  ) {}

  findById(campaignId: number): Promise<AttackCampaign> {
    this.logger.debug(`Find campaign with id: ${campaignId}`);

    return this.attackCampaignRepository.findOneBy({ id: campaignId });
  }

  findBySearchTerm(searchTerm: string): Promise<AttackCampaign[]> {
    this.logger.debug(
      `Find campaign with name or description containing: ${searchTerm}`,
    );

    return this.attackCampaignRepository.find({
      where: [
        { name: ILike(`%${searchTerm}%`) },
        { description: ILike(`%${searchTerm}%`) },
      ],
    });
  }
}
