import { HttpModule } from '@nestjs/axios';

import { Module } from '@nestjs/common';

import { HealthzController } from '@gutyerrez/mks-backend-challenge/healthz/controllers/http/HealthzController';

import { CheckApplicationStatusService } from '@gutyerrez/mks-backend-challenge/healthz/services/CheckApplicationStatusService/implementations/v1/CheckApplicationStatusService';

@Module({
  controllers: [ HealthzController ],
  imports: [ HttpModule ],
  providers: [
    {
      provide: 'CheckApplicationStatusService',
      useClass: CheckApplicationStatusService
    }
  ]
})
export class HealthzModule {}
