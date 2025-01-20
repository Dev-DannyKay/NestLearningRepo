import { BaseEntity } from 'src/shared/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Orders extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItem[];

  @Column('decimal')
  totalAmount: number;
}
