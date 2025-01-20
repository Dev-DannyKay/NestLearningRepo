import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { OrderItemDto } from '../dtos/order-items.dto';
import { Orders } from '../entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
  ) { }



  async createOrder(user: User, orderItems: OrderItemDto[]) {
    const totalAmount = this.calculateTotalAmount(orderItems);
    const order = this.ordersRepository.create({
      user,
      orderItems,
      totalAmount,
    });

    return await this.ordersRepository.save(order);
  }

  private calculateTotalAmount(orderItems: OrderItemDto[]): number {
    return orderItems.reduce((sum, item) => sum + item.price, 0);
  }


  async getOrder(orderId: string) {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
