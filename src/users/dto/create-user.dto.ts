import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  readonly  username: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
