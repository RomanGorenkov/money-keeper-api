import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/interfaces/user.interface';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // async validate(username: string, password: string): Promise<any> {
  //   const user = await this.authService.validateUser(username, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
  //
  async validate(username: string, password: string): Promise<any> {
    // const userFlag = await this.authService.validateUser(user);
    // if (!userFlag) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    // console.log('lol');
    return await this.authService.validateUser(username, password);
  }

}
