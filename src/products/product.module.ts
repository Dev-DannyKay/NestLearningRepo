import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsService } from './produts/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), AuthModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductModule {}
