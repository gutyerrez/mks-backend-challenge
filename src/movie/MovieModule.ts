import { Module } from '@nestjs/common';

import { MovieController } from '@gutyerrez/mks-backend-challenge/movie/controllers/http/MovieController';

@Module({
  controllers: [ MovieController ],
  providers: []
})
export class MovieModule {}
