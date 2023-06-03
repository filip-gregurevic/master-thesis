import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Req,
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

    return this.nlpService.search(userId, search.sentence);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('nlp/:id')
  async loadNLPSearchById(@Param('id') id: number): Promise<any> {
    this.logger.log(`Load NLP search with id: ${id}`);

    return this.nlpService.loadById(id);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete('nlp/:id')
  async deleteNLPSearch(@Param('id') id: number): Promise<any> {
    this.logger.log(`Delete NLP search with id: ${id}`);

    return this.nlpService.deleteById(id);
  }
}
