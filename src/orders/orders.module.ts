import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { Products } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { UserValidationMiddleware } from 'src/midddlewares/user-validation/user-validation.middleware';
import { ProductValidationMiddleware } from 'src/midddlewares/product-validation/product-validation.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Orders,Products,User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserValidationMiddleware)
      .forRoutes('orders/:userId'); 

    consumer
      .apply(ProductValidationMiddleware)
      .forRoutes('orders/:userId'); 
  }
}
