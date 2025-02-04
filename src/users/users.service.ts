import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/auth/dtos/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  // async createUser(createUserDto: RegisterDto): Promise<void> {
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  //   const newUser = this.usersRepository.create({
  //     ...createUserDto,
  //     password: hashedPassword,
  //   });
  //   await this.usersRepository.save(newUser);
  // }

  async createUser(createUserDto: RegisterDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) return existingUser;

    const hashedPassword = createUserDto.password
      ? await bcrypt.hash(createUserDto.password, 10)
      : null;

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  // async createOAuthUser(googleUserDto: GoogleUserDto): Promise<User> {
  //   let user = await this.findByEmail(googleUserDto.email);
  //   if (!user) {
  //     user = this.usersRepository.create({
  //       email: googleUserDto.email,
  //       firstName: googleUserDto.firstName,
  //       lastName: googleUserDto.lastName,
  //       picture: googleUserDto.picture,
  //       isOAuthUser: true,
  //       password: null, 
  //       role: Role.USER,
  //     });
  //     user = await this.usersRepository.save(user);
  //   }
  //   return user;
  // }


  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving user: ' + error.message);
    }
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting user: ' + error.message);
    }
  }

}
