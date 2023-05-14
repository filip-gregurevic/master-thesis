import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackTactic } from './entity/tactic.entity';
import { AttackTacticController } from './controller/tactic.controller';
import { AttackTacticService } from './service/tactic.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttackTactic])],
  controllers: [AttackTacticController],
  providers: [AttackTacticService],
  exports: [AttackTacticService],
})
export class AttackTacticModule {}
