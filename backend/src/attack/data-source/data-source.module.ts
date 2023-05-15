import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttackDataSource } from './entity/data-source.entity';
import { AttackDataSourceController } from './controller/data-source.controller';
import { AttackDataSourceService } from './service/data-source.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttackDataSource])],
  controllers: [AttackDataSourceController],
  providers: [AttackDataSourceService],
  exports: [AttackDataSourceService],
})
export class AttackDataSourceModule {}
