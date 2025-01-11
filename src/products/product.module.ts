import { Module } from '@nestjs/common';
import { ProdutsService } from './produts/produts.service';
import { ProductsController } from './products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), AuthModule],
  providers: [ProdutsService],
  controllers: [ProductsController],
})
export class ProductModule {}
