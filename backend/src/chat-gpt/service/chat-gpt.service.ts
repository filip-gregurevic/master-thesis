import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entity/conversation.entity';
import { UserService } from '../../user/service/user.service';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { Message } from '../entity/message.entity';
import { MessageType } from '../entity/message-type.enum';

@Injectable()
export class ChatGPTService {
  private readonly logger = new Logger(ChatGPTService.name);

  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  findByIdWithMessages(id: number): Promise<Conversation> {
    this.logger.debug(`Find Chat GPT conversation with id: ${id}`);

    return this.conversationRepository.findOne({
      where: {
        id,
      },
      relations: ['messages'],
    });
  }

  findByUserId(userId: number): Promise<Conversation[]> {
    this.logger.debug(`Find Chat GPT conversations by userId: ${userId}`);

    return this.conversationRepository.find({
      where: { user: { id: userId } },
      relations: ['messages'],
    });
  }

  async createConversation(
    userId: number,
    message: string,
  ): Promise<Conversation> {
    this.logger.debug(
      `Create Chat GPT conversations for user with Id: ${userId} and message: ${message}`,
    );

    const user = await this.userService.findById(userId);

    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: message,
    });
    this.logger.debug(
      `Chat GPT answered with: ${response.data.choices[0].text}`,
    );

    this.logger.debug(`Create conversation for user with id: ${userId}`);
    const conversation = await this.conversationRepository.create();
    conversation.user = user;
    await this.conversationRepository.save(conversation);

    this.logger.debug(`Create message for user with content: ${message}`);
    const userMessage = await this.messageRepository.create();
    userMessage.conversation = conversation;
    userMessage.content = message;
    userMessage.type = MessageType.User;
    await this.messageRepository.save(userMessage);

    this.logger.debug(
      `Create message for assistant with content: ${response.data.choices[0].text}`,
    );
    const aiMessage = await this.messageRepository.create();
    aiMessage.conversation = conversation;
    aiMessage.content = response.data.choices[0].text;
    aiMessage.type = MessageType.Assistant;
    await this.messageRepository.save(aiMessage);

    return { ...conversation, messages: [userMessage, aiMessage] };
  }

  async continueConversation(conversationId: number, message: string) {
    this.logger.debug(
      `Continue Chat GPT conversation with Id: ${conversationId} and message: ${message}`,
    );

    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['messages'],
    });

    // save user message
    const userMessage = await this.messageRepository.create();
    userMessage.content = message;
    userMessage.conversation = conversation;
    userMessage.type = MessageType.User;
    await this.messageRepository.save(userMessage);

    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        ...conversation.messages.map((message) => ({
          role: message.type,
          content: message.content,
        })),
        { role: 'user', content: message },
      ],
    });

    this.logger.debug(
      `Chat GPT answered with: ${response.data.choices[0].message.content}`,
    );

    this.logger.debug(
      `Create message for assistant with content: ${response.data.choices[0].message.content}`,
    );
    const aiMessage = await this.messageRepository.create();
    aiMessage.conversation = conversation;
    aiMessage.content = response.data.choices[0].message.content;
    aiMessage.type = MessageType.Assistant;
    await this.messageRepository.save(aiMessage);

    return {
      ...conversation,
      messages: [...conversation.messages, userMessage, aiMessage],
    };
  }

  deleteById(searchId: number) {
    this.logger.debug(`Delete ChatGPT conversation with id: ${searchId}`);

    return this.conversationRepository.delete(searchId);
  }
}
