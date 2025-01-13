import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class ProdutsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Products> {
    try {
      const product = this.productsRepository.create(createProductDto);
      this.productsRepository.save(product);
      return product;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  public async findAllProducts(): Promise<Products[]> {
    try {
      return this.productsRepository.find();
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  public async findProductById(id: string): Promise<Products> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException({ message: 'Product not found' });
    }
    return product;
  }

  public async updateProduct(
    id: string,
    updateProductDto: Partial<CreateProductDto>,
  ): Promise<Products> {
    const product = await this.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    try {
      await this.productsRepository.update(id, updateProductDto);
      return product;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  public async deleteProduct(id: string): Promise<void> {
    const product = await this.findProductById(id);
    try {
      await this.productsRepository.delete(id);
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
}
