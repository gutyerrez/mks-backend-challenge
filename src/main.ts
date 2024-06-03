import { CacheModule } from '@nestjs/cache-manager';

import { Logger, Module } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { FastifyAdapter } from '@nestjs/platform-fastify';

import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthzModule } from '@gutyerrez/mks-backend-challenge/healthz/HealthzModule';

import { Environment } from '@x-spacy/environment';

import * as CacheManagerRedisStore from 'cache-manager-redis-store';

import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Environment.getString('DATABASE_HOST'),
      port: Environment.getInt('DATABASE_PORT'),
      username: Environment.getString('DATABASE_USER'),
      password: Environment.getString('DATABASE_PASSWORD'),
      database: Environment.getString('DATABASE_NAME'),
      entities: []
    }),
    CacheModule.register<RedisClientOptions>({
      store: CacheManagerRedisStore,
      isGlobal: true,
      username: Environment.getString('REDIS_USERNAME'),
      database: Environment.getInt('REDIS_DATABASE'),
      password: Environment.getString('REDIS_PASSWORD')
    }),
    HealthzModule
  ]
})
export class ApplicationModule {
  public static async bootstrap() {
    NestFactory.create(ApplicationModule, new FastifyAdapter({
      logger: {
        level: 'info'
      }
    })).then(server => {
      server.listen(Environment.getInt('PORT')).then(
        () => Logger.log(`server is running on ${Environment.getString('APP_URL')}`)
      );
    });
  }
}

ApplicationModule.bootstrap();
