import {
  Controller,
  Get,
  Inject
} from '@nestjs/common';

import { ApplicationStatus } from '@gutyerrez/mks-backend-challenge/healthz/enums/ApplicationStatus';

import { ICheckApplicationStatusService } from '@gutyerrez/mks-backend-challenge/healthz/services/CheckApplicationStatusService/interfaces/ICheckApplicationStatusService';

@Controller('/healthz')
export class HealthzController {
  @Inject('CheckApplicationStatusService')
  private readonly checkApplicationStatusService: ICheckApplicationStatusService;

  @Get()
  public async check() {
    const applications = this.checkApplicationStatusService.handle();

    return {
      status: applications.some(it => it.isOnline()) ? ApplicationStatus.ONLINE : ApplicationStatus.OFFLINE,
      applications
    };
  }
}
