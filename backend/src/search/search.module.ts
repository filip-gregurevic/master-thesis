import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Search } from './entity/search.entity';
import { SearchController } from './controller/search.controller';
import { SearchService } from './service/search.service';
import { UserModule } from '../user/user.module';
import { AttackModule } from '../attack/attack.module';
import { DefendModule } from '../defend/defend.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Search]),
    UserModule,
    AttackModule,
    DefendModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
