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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Products } from '../entities/product.entity';
import { ProdutsService } from '../produts/produts.service';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProdutsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.productsService.createProduct(createProductDto);
    res.send({ message: 'Product created successfully' }); // Send the message using res
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAllProducts(): Promise<Products[]> {
    return await this.productsService.findAllProducts();
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
  public async deletProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.productsService.deleteProduct(id);
    res.send({ message: 'Product deleted succesfully' });
  }
}
