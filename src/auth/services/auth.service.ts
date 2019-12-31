import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/interfaces/user.interface';
import { CostService } from '../../costs/services/cost/cost.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly costService: CostService,
    private readonly jwtService: JwtService,
  ) {
  }

  async registration(userData: CreateUserDto): Promise<string> {
    return await this.usersService.addUser(userData);
  }

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.checkUser(email, password);
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login(userDatabaseResponse: User) {
    const userData = userDatabaseResponse;
    const payload = { username: userData.username, sub: userData._id };
    const userPresets = await this.usersService.getUserPreset(userData._id);
    const userCosts = await this.costService.getAllUserCosts(userData._id);
    return {
      access_token: this.jwtService.sign(payload),
      userPresets,
      userCosts,
    };
  }
}
