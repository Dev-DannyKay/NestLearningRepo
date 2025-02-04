import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}


  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Products> {
    try {
      const product = this.productsRepository.create(createProductDto);
      await this.productsRepository.save(product); 
      return product;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }


  // public async findAllProducts(
  //   paginationDto: PaginationDto,
  // ): Promise<Pagination<Products>> {
  //   try {
  //     const queryBuilder = this.productsRepository.createQueryBuilder('products');

  //     // Optional: Apply filtering or sorting here
  //     queryBuilder.orderBy('products.productName', 'ASC');

  //     return await paginate<Products>(queryBuilder, {
  //       page: paginationDto.page,
  //       limit: paginationDto.limit,
  //     });
  //   } catch (error) {
  //     throw new BadRequestException({ message: error.message });
  //   }
  // }


  public async findAllProducts(): Promise<Products[]> {
    try {
     return await this.productsRepository.find();
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async getProductByCategory(category: string): Promise<Products[]> {
    try {
      return await this.productsRepository.find({ where: { category: category } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // public async findProductById(id: string): Promise<Products> {
  //   throw new Error('Product not found');
  // }

  public async findProductById(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;

    } catch (error) {
      throw new InternalServerErrorException( error.message );
    }
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
   await this.findProductById(id);
    try {
      await this.productsRepository.delete(id);
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
}


