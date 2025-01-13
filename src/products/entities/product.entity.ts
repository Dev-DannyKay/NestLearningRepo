import { BaseEntity } from 'src/shared/entities/base.entity';
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Products extends BaseEntity{

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @Column()
  imageUrl: string;

  @Column('simple-array', { nullable: true }) 
  categories: string[];
}
