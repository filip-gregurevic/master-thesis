import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackCampaign } from '../entity/campaign.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttackCampaignService {
  private readonly logger = new Logger(AttackCampaignService.name);

  constructor(
    @InjectRepository(AttackCampaign)
    private readonly attackCampaignRepository: Repository<AttackCampaign>,
  ) {}
}
