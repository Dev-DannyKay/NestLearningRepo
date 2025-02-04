import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }


  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteUser(
    @Param('id') id: string,
  ): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
