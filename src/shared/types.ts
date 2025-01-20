import { Request } from 'express';
import { OrderItemDto } from 'src/orders/dtos/order-items.dto';
import { User } from "src/users/entities/user.entity";

export interface AuthenticatedRequest extends Request {
    user: User; 
    product:OrderItemDto[]
  }