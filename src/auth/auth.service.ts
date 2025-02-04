import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from 'src/users/entities/user.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}


  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.findByEmail(registerDto.email);
      if (user) {
        throw new ConflictException('Invalid email or password');
      }
      return this.usersService.createUser(registerDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
        return user;
    }
    return null;
}

async validateGoogleUser(profile: any) {
  try {
    const { displayName, emails, photos } = profile;
  const email = emails[0].value;
  const picture = photos[0].value;
  const [firstName, ...lastNameParts] = displayName.split(' ');
  const lastName = lastNameParts.join(' ') || 'Unknown';

  let user = await this.usersService.findByEmail(email);

  if (!user) {
    user = await this.usersService.createUser({
      email,
      firstName,
      lastName,
      picture,
      isOAuthUser: true, 
      role: Role.USER,
    });
  }

  return {
    displayName: user.displayName, 
    email: user.email,
    picture: user.picture,
  };
} catch (error) {
  throw new InternalServerErrorException('Failed to authenticate user with Google');
}
}


async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
        throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: user.email, id: user.id , role: user.role};
    return { accessToken: this.jwtService.sign(payload) };
}


}
