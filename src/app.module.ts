import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { EntityModule } from './global/entity.module';
import { AdminModule } from './modules/admin/admin.module';
import ormConfig from './db/config/ds.config';

@Module({
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...ormConfig,
      autoLoadEntities: true,
    }),

    EntityModule,

    UserModule,
    AdminModule,

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60, // time to live in seconds
        limit: 100, // max number of requests within TTL
      },
    ]),
  ],
  providers: [
    // Global rate limiting guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
