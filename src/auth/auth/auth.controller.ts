import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { Response } from 'express';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { AuthenticatedRequest } from 'src/shared/types';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Promise<void> {
      await this.authService.register(registerDto);
      res.status(201).send({ message: 'User created successfully' })
  }


  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin(){
  return {msg:'Google Login'}
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response){
    const user = req.user;
    res.json(user);
  }

}
