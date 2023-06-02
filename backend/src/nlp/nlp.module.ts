import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NLPSearch } from './entity/nlp-search.entity';
import { UserModule } from '../user/user.module';
import { NLPController } from './controller/nlp.controller';
import { NLPService } from './service/nlp.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([NLPSearch]),
    UserModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [NLPController],
  providers: [NLPService],
  exports: [NLPService],
})
export class NLPModule {}
