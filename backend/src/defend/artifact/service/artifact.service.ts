import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefendArtifact } from '../entity/artifact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DefendArtifactService {
  private readonly logger = new Logger(DefendArtifactService.name);

  constructor(
    @InjectRepository(DefendArtifact)
    private readonly defendArtifactRepository: Repository<DefendArtifact>,
  ) {}
}
