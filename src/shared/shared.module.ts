import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';

@Module({
  imports: [],
  providers: [
    CloudinaryService,
  ],
  exports: [
    CloudinaryService,
  ],
  controllers: [],
})
export class SharedModule {
}
