import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductValidationMiddleware implements NestMiddleware {
  constructor(@InjectRepository(Products) private productsRepository: Repository<Products>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      throw new NotFoundException('No items provided or items is not an array');
    }

    const validatedItems = await Promise.all(
      items.map(async (item) => {
        if (!item.productId) {
          throw new NotFoundException('Item is missing some required fields');
        }

        const product = await this.productsRepository.findOneBy({ id: item.productId });
        if (!product) {
          throw new NotFoundException(`Product  not found`);
        }

        return {
          ...item,
          productName: product.productName,
          price: product.price,
        };
      }),
    );

    req['product'] = validatedItems; 
    next();
  }
}
