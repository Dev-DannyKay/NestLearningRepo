import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProdutsService } from '../produts/produts.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Products } from '../entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProdutsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Products> {
    return await this.productsService.createProduct(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAllProducts(): Promise<Products[]> {
    return await this.productsService.findAllProducts();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findProductById(@Param('id') id: number): Promise<Products> {
    return await this.productsService.findProductById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
  public async updateProduct(
    @Param('id') id: number,
    updateProductDto: CreateProductDto,
  ): Promise<Products> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deletProduct(@Param('id') id: number): Promise<void> {
    await this.productsService.deleteProduct(id);
  }
}
