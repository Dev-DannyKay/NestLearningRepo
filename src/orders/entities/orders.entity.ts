import { BaseEntity } from 'src/shared/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Order extends BaseEntity{
 
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @Column('jsonb') // Store order items as a JSONB array
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;

  @Column('decimal')
  totalAmount: number;
}
