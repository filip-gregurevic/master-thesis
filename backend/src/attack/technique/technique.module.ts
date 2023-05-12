import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackTechnique } from './entity/technique.entity';
import { AttackTechniqueController } from './controller/technique.controller';
import { AttackTechniqueService } from './service/technique.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttackTechnique])],
  controllers: [AttackTechniqueController],
  providers: [AttackTechniqueService],
  exports: [AttackTechniqueService],
})
export class AttackTechniqueModule {}
