import { Injectable } from '@nestjs/common';
import { dataUri } from '../../../utilities/convert-file-to-datauri';
import { UploadApiOptions } from 'cloudinary';

const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dqtf98ms4',
  api_key: '934464852179458',
  api_secret: 'LrZzGVv30oO5xE2uRhKPIMFNG5A',
});

@Injectable()
export class CloudinaryService {

  async uploadImg(image): Promise<any> {
    // const fileStream = fs.createReadStream(image.buffer);
    // const file = dataUri(image).content;
    let imageUrl = '';
    const data = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    // const data = `${image.buffer.toString('base64')}`;
    //
    // const file = new File(image.buffer, 'filename.svg', { type: 'data:image/svg+xml;charset=utf-8' });
    // console.log(file);
    // const options: UploadApiOptions = { type: 'data:image/svg+xml;charset=utf-8' };
    // await cloudinary.uploader.unsigned_upload(`data:${image.mimetype};base64,${image.buffer.toString('base64')}`, 'vmlca0sa', { }, async (error, result) => {
    //   console.log(result, error);
    //   console.log('ATATATATA');
    //   if (!error) {
    //     imageUrl = result.secure_url;
    //   }
    //   console.log(new Uint8Array(image.buffer).toString());
    // });

    await cloudinary.v2.uploader.upload(data,
      async (error, result) => {
        if (!error) {
          imageUrl = result.secure_url;
        }
        console.log(error);
      });
    return imageUrl;

  }
}
