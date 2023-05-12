import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackGroup } from '../entity/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttackGroupService {
  private readonly logger = new Logger(AttackGroupService.name);

  constructor(
    @InjectRepository(AttackGroup)
    private readonly attackGroupRepository: Repository<AttackGroup>,
  ) {}
}
