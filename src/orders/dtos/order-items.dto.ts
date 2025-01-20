import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderItemDto {
    @IsNotEmpty()
    @IsString()
    productId: string;
  
    @IsNotEmpty()
    @IsString()
    productName: string;
  
    @IsNumber()
    price: number;
  
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
  }