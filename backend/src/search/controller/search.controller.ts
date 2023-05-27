import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SearchService } from '../service/search.service';
import { JWTAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Role } from '../../user/entity/role.enum';
import { Roles } from '../../auth/decorator/roles.decorator';

@Controller('')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('users/:userId/searches')
  getSearchesByUserId(@Param('userId') userId: number) {
    this.logger.log(`Get searches for user with id: ${userId}`);

    return this.searchService.findByUserId(userId);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Post('users/:userId/searches')
  search(
    @Param('userId') userId: number,
    @Body() search: { searchTerm: string },
  ) {
    this.logger.log(
      `User with id ${userId} searched for: ${search.searchTerm}`,
    );

    return this.searchService.performSearch(userId, search.searchTerm);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('searches/:searchId')
  GetSearch(@Param('searchId') searchId: number) {
    this.logger.log(`Get search with id: ${searchId}`);

    return this.searchService.loadSearchById(searchId);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete('searches/:searchId')
  deleteSearch(@Param('searchId') searchId: number) {
    this.logger.log(`Delete search with id: ${searchId}`);

    return this.searchService.deleteById(searchId);
  }
}
