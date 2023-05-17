import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackMitigation } from './entity/mitigation.entity';
import { AttackMitigationController } from './controller/mitigation.controller';
import { AttackMitigationService } from './service/mitigation.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttackMitigation])],
  controllers: [AttackMitigationController],
  providers: [AttackMitigationService],
  exports: [AttackMitigationService],
})
export class MitigationModule {}
