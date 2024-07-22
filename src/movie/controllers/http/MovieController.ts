import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';

import { CreateMovieValidator } from '@gutyerrez/mks-backend-challenge/movie/controllers/validators/MovieValidators';

@Controller('/movie')
export class MovieController {
  @Get()
  public index(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('filter') filter: string
  ): Promise<unknown> {
    return Promise.resolve();
  }

  @Get(':id')
  public show(
    @Param('id') id: string
  ): Promise<unknown> {
    return Promise.resolve();
  }

  @Post()
  public create(
    @Body() _: CreateMovieValidator
  ): Promise<unknown> {
    return Promise.resolve();
  }

  @Put()
  public update(): Promise<unknown> {
    return Promise.resolve();
  }

  @Delete()
  public delete(): Promise<unknown> {
    return Promise.resolve();
  }
}
