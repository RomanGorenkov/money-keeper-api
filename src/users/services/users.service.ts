import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashService } from './hash/hash.service';
import { User } from '../interfaces/user.interface';
import { UserPreset } from '../interfaces/user-preset.interfase';
import { UserSettings } from '../interfaces/user-settings.interface';
import { CloudinaryService } from '../../shared/services/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<User>,
    private hashService: HashService,
    private cloudinaryService: CloudinaryService,
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

  async getUserById(id: string): Promise<User> {
    return await this.usersModel.findById(id);
  }

  async checkUser(email: string, password: string) {
    const user: User = await this.getUserByEmail(email);
    const compere = await this.hashService.compareHash(password, user.password);
    if (user && compere) {
      const { password, ...result } = Object(user)._doc;
      return result;
    }
    return null;
  }

  async changeUserLanguage(language: string, _id: string) {
    await this.usersModel.updateOne({_id}, {
      language,
    });
  }

  async getUserLanguage(id: string) {
    const user: User = await this.getUserById(id);
    return user.language;
  }

  async changeUserCurrency(currency: string, _id: string) {
    await this.usersModel.updateOne({_id}, {
      currencyName: currency,
    });
  }

  async getUserCurrency(id: string) {
    const user: User = await this.getUserById(id);
    return user.currencyName;
  }

  async getUserPreset(id: string) {
    const user: User = await this.getUserById(id);
    const preset: UserPreset = {
      language: user.language,
      currencyName: user.currencyName,
    };
    return preset;
  }

  async getUserSettings(id: string) {
    const user: User = await this.getUserById(id);
    const settings: UserSettings = {
      username: user.username,
      userAvatarUrl: user.userAvatarUrl,
    };
    return settings;
  }

  async setUserSettings(id: string, settings: UserSettings, avatarFile) {
    const filter = {
      _id: id,
    };
    if (avatarFile) {
      const userAvatarUrl = await this.cloudinaryService.uploadImg(avatarFile);
      console.log(userAvatarUrl);
      await this.usersModel.findOneAndUpdate(filter, {
        userAvatarUrl,
        });
    }
    await this.usersModel.findOneAndUpdate(filter , settings);
    return await this.getUserSettings(id);
  }

}
