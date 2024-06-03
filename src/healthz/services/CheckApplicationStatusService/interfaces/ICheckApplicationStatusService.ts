import { Application } from '@gutyerrez/mks-backend-challenge/healthz/data/Application';

export interface ICheckApplicationStatusService {
  handle(): Array<Application>
}
