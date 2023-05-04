import { Controller, Logger } from '@nestjs/common';

@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);
}
