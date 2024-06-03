import { Expose } from 'class-transformer';

import { ApplicationStatus } from '@gutyerrez/mks-backend-challenge/healthz/enums/ApplicationStatus';

export class Application {
  @Expose({ name: 'service_name' })
  public readonly name: string;

  @Expose({ name: 'status' })
  public status: ApplicationStatus | undefined;

  constructor(name: string, status?: ApplicationStatus) {
    this.name = name;
    this.status = status;
  }

  public isOnline(): boolean {
    if (this.status === undefined) {
      return false;
    }

    return this.status === ApplicationStatus.ONLINE;
  }
}
