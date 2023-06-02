import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
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
}
