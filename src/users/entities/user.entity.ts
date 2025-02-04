import { Exclude, Expose } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
import { Orders } from 'src/orders/entities/orders.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  picture: string;

  @Column({
    type:'enum',
    enum:Role,
    default:Role.USER
  })
  role: Role

  @Column({ nullable: true })
  @Exclude() 
  password?: string;

  @Column({ default: false })
  isOAuthUser: boolean;


  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @Expose()
  get displayName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

}
