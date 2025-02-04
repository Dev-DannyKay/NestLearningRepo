import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Products } from '../entities/product.entity';
import { ProductsService } from '../produts/products.service';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.productsService.createProduct(createProductDto);
    res.send({ message: 'Product created successfully' }); 
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  public async findAllProducts(): Promise<Products[]> {
    return await this.productsService.findAllProducts();
  }

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // public async findAllProducts(
  //   @Query() paginationDto: PaginationDto,
  // ): Promise<Pagination<Products>> {
  //   console.log(paginationDto)
  //   return await this.productsService.findAllProducts(paginationDto);
  // }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getProductByCategory(@Param('category') category: string) {
    return await this.productsService.getProductByCategory(category);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findProductById(@Param('id') id: string): Promise<Products> {
    return await this.productsService.findProductById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
  public async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ): Promise<Products> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.productsService.deleteProduct(id);
    res.send({ message: 'Product deleted successfully' });
  }
}
