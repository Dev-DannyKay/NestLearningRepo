import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/config.module';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './products/product.module';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    ProductModule,
    OrdersModule,
  ],
})
export class AppModule {}
