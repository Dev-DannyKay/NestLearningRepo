import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  categories: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
