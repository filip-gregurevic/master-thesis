import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entity/conversation.entity';
import { UserModule } from '../user/user.module';
import { ChatGPTController } from './controller/chat-gpt.controller';
import { ChatGPTService } from './service/chat-gpt.service';
import { ConfigModule } from '@nestjs/config';
import { Message } from './entity/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message]),
    UserModule,
    ConfigModule,
  ],
  controllers: [ChatGPTController],
  providers: [ChatGPTService],
  exports: [ChatGPTService],
})
export class ChatGPTModule {}
