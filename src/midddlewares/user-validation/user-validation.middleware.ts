import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import{ Request, Response, NextFunction} from 'express';
import { AuthenticatedRequest } from 'src/shared/types';


@Injectable()
export class UserValidationMiddleware implements NestMiddleware {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

 async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId = req.params.userId || req.body.userId;
    if(!userId){
      throw new NotFoundException();
    }
    const user = await this.usersRepository.findOneBy({id:userId});
    if(!user){
      throw new NotFoundException();
    }
    req.user = user;
    next();
  }
}
