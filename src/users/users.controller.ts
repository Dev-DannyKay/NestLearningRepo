import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {

    constructor(private readonly userService:UsersService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    public async findUsers(): Promise<User[]> {
      return await this.userService.findAllUsers();
    }
}
