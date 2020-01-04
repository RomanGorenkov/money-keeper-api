import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CostSchema } from './schemas/costs.schema';
import { CostService } from './services/cost/cost.service';
import { CostsController } from './controllers/costs/costs.controller';
import { CostCategorySchema } from './schemas/cost-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Costs', schema: CostSchema }]),
    MongooseModule.forFeature([{ name: 'CostCategories', schema: CostCategorySchema }]),
  ],
  providers: [
    CostService,
  ],
  exports: [
    CostService,
  ],
  controllers: [CostsController],
})
export class CostsModule {}
