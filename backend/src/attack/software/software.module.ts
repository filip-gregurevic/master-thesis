import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackSoftware } from './entity/software.entity';
import { AttackSoftwareController } from './controller/software.controller';
import { AttackSoftwareService } from './service/software.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttackSoftware])],
  controllers: [AttackSoftwareController],
  providers: [AttackSoftwareService],
  exports: [AttackSoftwareService],
})
export class AttackSoftwareModule {}
