import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './controllers/users.controller';
import { HashService } from './services/hash/hash.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
  ],
  providers: [
    UsersService,
    HashService,
  ],
  exports: [
    UsersService,
    HashService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
