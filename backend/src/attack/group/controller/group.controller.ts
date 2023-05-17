import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AttackGroupService } from '../service/group.service';
import { AttackGroup } from '../entity/group.entity';

@Controller('attack-groups')
export class AttackGroupController {
  private readonly logger = new Logger(AttackGroupController.name);

  constructor(private readonly attackGroupService: AttackGroupService) {}

  @Get('/:groupId')
  getGroupById(@Param('groupId') groupId: number): Promise<AttackGroup> {
    this.logger.log(`Get group with id: ${groupId}`);

    return this.attackGroupService.findById(groupId);
  }
}
