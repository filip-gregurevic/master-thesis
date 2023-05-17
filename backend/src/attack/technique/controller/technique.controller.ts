import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AttackTechniqueService } from '../service/technique.service';
import { AttackTechnique } from '../entity/technique.entity';

@Controller('attack-techniques')
export class AttackTechniqueController {
  private readonly logger = new Logger(AttackTechniqueController.name);

  constructor(
    private readonly attackTechniqueService: AttackTechniqueService,
  ) {}

  @Get('/:techniqueId')
  getTechniqueById(
    @Param('techniqueId') techniqueId: number,
  ): Promise<AttackTechnique> {
    this.logger.log(`Get software with id: ${techniqueId}`);

    return this.attackTechniqueService.findById(techniqueId);
  }
}
