import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Role } from '../../user/entity/role.enum';
import { NLPService } from '../service/nlp.service';

@Controller('')
export class NLPController {
  private readonly logger = new Logger(NLPController.name);

  constructor(private readonly nlpService: NLPService) {}

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('users/:userId/nlp')
  getSearchesByUserId(@Param('userId') userId: number) {
    this.logger.log(`Get NLP searches for user with id: ${userId}`);

    return this.nlpService.findByUserId(userId);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('users/:userId/nlp')
  search(
    @Param('userId') userId: number,
    @Body() search: { sentence: string },
  ) {
    this.logger.log(`User with id ${userId} searched for: ${search.sentence}`);

    return this.nlpService.search(search.sentence);
  }
}
