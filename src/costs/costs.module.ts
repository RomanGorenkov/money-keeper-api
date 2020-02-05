import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CostSchema } from './schemas/costs.schema';
import { CostService } from './services/cost/cost.service';
import { CostsController } from './controllers/costs/costs.controller';
import { CostCategorySchema } from './schemas/cost-category.schema';
import { CostCategoryService } from './services/cost-category/cost-category.service';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { CurrencyService } from './services/currency/currency.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Costs', schema: CostSchema }]),
    MongooseModule.forFeature([{ name: 'CostCategories', schema: CostCategorySchema }]),
    SharedModule,
    UsersModule,
  ],
  providers: [
    CostService,
    CostCategoryService,
    CurrencyService,
  ],
  exports: [
    CostService,
    CostCategoryService,
  ],
  controllers: [CostsController],
})
export class CostsModule {}
