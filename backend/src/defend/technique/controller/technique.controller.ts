import { Controller, Get, Logger, Param } from '@nestjs/common';
import { DefendTechniqueService } from '../service/technique.service';
import { DefendTechnique } from '../entity/technique.entity';

@Controller('defend-techniques')
export class DefendTechniqueController {
  private readonly logger = new Logger(DefendTechniqueController.name);

  constructor(
    private readonly defendTechniqueService: DefendTechniqueService,
  ) {}

  @Get('/:techniqueId')
  getTechniqueById(
    @Param('techniqueId') techniqueId: number,
  ): Promise<DefendTechnique> {
    this.logger.log(`Get technique with id: ${techniqueId}`);

    return this.defendTechniqueService.findById(techniqueId);
  }
}
