import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackGroup } from './entity/group.entity';
import { AttackGroupController } from './controller/group.controller';
import { AttackGroupService } from './service/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttackGroup])],
  controllers: [AttackGroupController],
  providers: [AttackGroupService],
  exports: [AttackGroupService],
})
export class AttackGroupModule {}
