import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entity/conversation.entity';

@Injectable()
export class ChatGPTService {
  private readonly logger = new Logger(ChatGPTService.name);

  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  findByUserId(userId: number): Promise<Conversation[]> {
    this.logger.debug(`Find Chat GPT conversations by userId: ${userId}`);

    return this.conversationRepository.find({
      where: { user: { id: userId } },
    });
  }

  deleteById(searchId: number) {
    this.logger.debug(`Delete ChatGPT conversation with id: ${searchId}`);

    return this.conversationRepository.delete(searchId);
  }
}
