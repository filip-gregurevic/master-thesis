import { Controller, Logger } from '@nestjs/common';

@Controller('defend-artifacts')
export class DefendArtifactController {
  private readonly logger = new Logger(DefendArtifactController.name);
}
