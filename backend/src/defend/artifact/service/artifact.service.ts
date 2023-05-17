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

  findById(artifactId: number): Promise<DefendArtifact> {
    this.logger.debug(`Find artifact with id: ${artifactId}`);

    return this.defendArtifactRepository.findOneBy({ id: artifactId });
  }
}
