import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Role } from '../../user/entity/role.enum';
import { ChatGPTService } from '../service/chat-gpt.service';

@Controller('')
export class ChatGPTController {
  private readonly logger = new Logger(ChatGPTController.name);

  constructor(private readonly chatGPTService: ChatGPTService) {}

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('users/:userId/chat-gpt')
  getSearchesByUserId(@Param('userId') userId: number) {
    this.logger.log(`Get ChatGPT conversations for user with id: ${userId}`);

    return this.chatGPTService.findByUserId(userId);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('users/:userId/chat-gpt')
  startChatGPTConversation(
    @Param('userId') userId: number,
    @Body() message: { content: string },
  ) {
    this.logger.log(
      `Start ChatGPT conversation for user with id: ${userId} with message ${message.content}`,
    );

    return this.chatGPTService.createConversation(userId, message.content);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('chat-gpt/conversations/:id')
  async loadConversation(@Param('id') id: number): Promise<any> {
    this.logger.log(`Load ChatGPT conversation with id: ${id}`);

    return this.chatGPTService.findByIdWithMessages(id);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Patch('chat-gpt/conversations/:id')
  async continueConversation(
    @Param('id') id: number,
    @Body() message: { content: string },
  ): Promise<any> {
    this.logger.log(
      `Continue ChatGPT conversation with id: ${id} and message ${message.content}`,
    );

    return this.chatGPTService.continueConversation(id, message.content);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete('chat-gpt/conversations/:id')
  async deleteConversation(@Param('id') id: number, @Req() req): Promise<any> {
    this.logger.log(`Delete ChatGPT conversations with id: ${id}`);

    return this.chatGPTService.deleteById(id);
  }
}
