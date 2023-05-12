import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefendTechnique } from './entity/technique.entity';
import { DefendTechniqueController } from './controller/technique.controller';
import { DefendTechniqueService } from './service/technique.service';

@Module({
  imports: [TypeOrmModule.forFeature([DefendTechnique])],
  controllers: [DefendTechniqueController],
  providers: [DefendTechniqueService],
  exports: [DefendTechniqueService],
})
export class DefendTechniqueModule {}
