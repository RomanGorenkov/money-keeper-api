import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashService } from './hash/hash.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<User>,
    private hashService: HashService,
  ) {
  }

  async addUser(userData: CreateUserDto): Promise<string> {
    if (await this.getUserByEmail(userData.email)) {
      return 'Email is already taken';
    }
    userData.password = await this.hashService.getHash(userData.password);
    const newUser = await this.usersModel(userData);
    newUser.save();
    return 'User has been submitted successfully!';
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersModel.findOne({ email });
  }

  async checkUser(email: string, password: string) {
    console.log(email);
    const user: User = await this.getUserByEmail(email);
    console.log(user);
    const compere = await this.hashService.compareHash(password, user.password);
    if (user && compere) {
      const { password, ...result } = Object(user)._doc;
      return result;
    }
    return null;
  }
}
