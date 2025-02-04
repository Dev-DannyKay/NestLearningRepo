import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/config.module';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './products/product.module';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'src/config/db/data-source';
import { AllExceptionsFilter } from './config/filters/all-exceptin.filter';
import { APP_FILTER } from '@nestjs/core';
import { BadRequestExceptionFilter } from './config/filters/bad-request-exception.filter';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    CacheModule.register(
      {
        isGlobal: true,
        ttl: 10, 
        max: 100,
      }
    ),
    UsersModule,
    AuthModule,
    ProductModule,
    OrdersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: BadRequestExceptionFilter,
    // },
  ],
})
export class AppModule {}
