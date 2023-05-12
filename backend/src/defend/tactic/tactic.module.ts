import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefendTactic } from './entity/tactic.entity';
import { DefendTacticController } from './controller/tactic.controller';
import { DefendTacticService } from './service/tactic.service';

@Module({
  imports: [TypeOrmModule.forFeature([DefendTactic])],
  controllers: [DefendTacticController],
  providers: [DefendTacticService],
  exports: [DefendTacticService],
})
export class DefendTacticModule {}
