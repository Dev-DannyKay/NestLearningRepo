import { IsBoolean, isBoolean, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @IsBoolean()
  isOAuthUser?: boolean;

  @IsString()
  picture?: string;

  @IsEnum(Role) 
  role: Role; 
}
