import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/shared/types';
import { OrderItemDto } from '../dtos/order-items.dto';
import { Orders } from '../entities/orders.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post(':userId')
  async createOrder(
    @Param('userId') userId: string,
    @Req() req: AuthenticatedRequest, 
    @Body() createOrderDto: OrderItemDto[], 
  ): Promise<Orders> {
    const user = req.user; 
    const product = req['product']; 
    return this.ordersService.createOrder(user, product);
  }

  @Get(':id')
  async getOrder(@Param('id') orderId: string): Promise<Orders> {
    return this.ordersService.getOrder(orderId);
  }
}
