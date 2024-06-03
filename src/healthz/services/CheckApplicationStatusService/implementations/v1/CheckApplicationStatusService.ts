import { HttpService } from '@nestjs/axios';

import { Inject, Injectable } from '@nestjs/common';

import { Application } from '@gutyerrez/mks-backend-challenge/healthz/data/Application';

import { ApplicationStatus } from '@gutyerrez/mks-backend-challenge/healthz/enums/ApplicationStatus';

import { ICheckApplicationStatusService } from '@gutyerrez/mks-backend-challenge/healthz/services/CheckApplicationStatusService/interfaces/ICheckApplicationStatusService';

@Injectable()
export class CheckApplicationStatusService implements ICheckApplicationStatusService {
  @Inject()
  private readonly httpService: HttpService;

  public handle(): Array<Application> {
    const http = new Application('http');

    try {
      this.httpService.get('/');
    } catch {
      http.status = ApplicationStatus.OFFLINE;
    } finally {
      http.status = ApplicationStatus.ONLINE;
    }

    return [ http ];
  }
}
