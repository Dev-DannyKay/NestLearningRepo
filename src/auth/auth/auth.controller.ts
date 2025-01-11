import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.authService.register(registerDto);
      res.status(201).send({ message: 'User created successfully' });
    } catch (e) {
      res.status(400).send({ message: 'Failed to create user' });
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const accessToken = await this.authService.login(loginDto);
      return res.status(200).json(accessToken);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
