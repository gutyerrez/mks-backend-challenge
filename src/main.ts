import { CacheModule } from '@nestjs/cache-manager';

import { Logger, Module } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { FastifyAdapter } from '@nestjs/platform-fastify';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthzModule } from '@gutyerrez/mks-backend-challenge/healthz/HealthzModule';

import { MovieModule } from '@gutyerrez/mks-backend-challenge/movie/MovieModule';

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
    CacheModule.register<RedisClientOptions & {
      host: string,
      port: number
    }>({
      store: CacheManagerRedisStore,
      isGlobal: true,
      host: Environment.getString('REDIS_HOST'),
      port: Environment.getInt('REDIS_PORT'),
      username: Environment.getString('REDIS_USERNAME'),
      database: Environment.getInt('REDIS_DATABASE'),
      password: Environment.getString('REDIS_PASSWORD')
    }),
    HealthzModule,
    MovieModule
  ]
})
export class ApplicationModule {
  public static async bootstrap() {
    NestFactory.create(ApplicationModule, new FastifyAdapter()).then(server => {
      const documnet = new DocumentBuilder()
        .setTitle('MKS Backend Challenge')
        .setDescription('MKS Backend Challenge')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const swagger = SwaggerModule.createDocument(server, documnet);

      SwaggerModule.setup('api/docs', server, swagger);

      server.listen(Environment.getInt('PORT')).then(
        () => Logger.log(`Server is running on ${Environment.getString('APP_URL')} 🚀`, 'NestApplication')
      );
    });
  }
}

ApplicationModule.bootstrap();
