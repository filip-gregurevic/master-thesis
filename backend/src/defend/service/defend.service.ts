import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DefendService {
  private readonly logger = new Logger(DefendService.name);
}
