import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entity/conversation.entity';
import { UserModule } from '../user/user.module';
import { ChatGPTController } from './controller/chat-gpt.controller';
import { ChatGPTService } from './service/chat-gpt.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    UserModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [ChatGPTController],
  providers: [ChatGPTService],
  exports: [ChatGPTService],
})
export class ChatGPTModule {}
