import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../interfaces/user.interface';
import { Model } from 'mongoose';

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dqtf98ms4',
  api_key: '934464852179458',
  api_secret: 'LrZzGVv30oO5xE2uRhKPIMFNG5A',
});

@Injectable()
export class CloudinaryService {

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<User>,
  ) {
  }

  async uploadImg(userId: string, image) {
    const filter = {
      _id: userId,
    };
    const data = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    await cloudinary.v2.uploader.upload(data,
      async (error, result) => {
        if (!error) {
          await this.usersModel.findOneAndUpdate(filter, {
            userAvatarUrl: result.secure_url,
          });
        }
      });
  }
}
