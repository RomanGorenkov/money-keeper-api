import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CostsModule } from './costs/costs.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CostsModule,
    MongooseModule.forRoot('mongodb://localhost/money-keeper'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
