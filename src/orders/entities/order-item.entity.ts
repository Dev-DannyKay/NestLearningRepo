import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from 'src/products/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Orders, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Orders;

  @ManyToOne(() => Products,(product)=> product.orderItems, { eager: true })
  product: Products;

  @Column('int')
  quantity: number;
}
