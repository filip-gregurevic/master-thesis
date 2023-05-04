import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Search } from './entity/search.entity';
import { SearchController } from './controller/search.controller';
import { SearchService } from './service/search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Search])],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
