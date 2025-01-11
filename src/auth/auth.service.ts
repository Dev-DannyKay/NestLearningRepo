import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(registerDto.email);
    if (user) {
      return { meassage: 'Invalid password or email' };
    }
    return this.usersService.createUser(registerDto);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    }
    if (
      user &&
      (await this.usersService.validatePassword(
        loginDto.password,
        user.password,
      ))
    ) {
      const payload = { email: user.email };
      return { accessToken: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException();
  }
}
