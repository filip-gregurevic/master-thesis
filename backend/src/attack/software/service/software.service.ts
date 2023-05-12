import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttackSoftware } from '../entity/software.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttackSoftwareService {
  private readonly logger = new Logger(AttackSoftwareService.name);

  constructor(
    @InjectRepository(AttackSoftware)
    private readonly attackSoftwareRepository: Repository<AttackSoftware>,
  ) {}
}
