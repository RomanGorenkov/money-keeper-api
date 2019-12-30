import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Costs } from '../../interfaces/costs.interface';
import { CreateCostsDto } from '../../dto/create-costs.dto';

@Injectable()
export class CostService {

  constructor(
    @InjectModel('Costs') private readonly costsModel: Model<Costs>,
  ) {}

  async addCost(costData: CreateCostsDto, userId: string): Promise<string> {
    console.log({ userId, ...costData});
    const newCost = await this.costsModel({ userId, ...costData});
    newCost.save();
    return 'Cost has been submitted successfully!';
  }

  async getUserCategoryCost(categoryName: string, userId: string, startDate: number, endDate: number): Promise<CreateCostsDto[]> {
    const costList: CreateCostsDto[] = await this.costsModel.find({
      costType: categoryName,
      costDate: { $gt: startDate, $lt: endDate },
      userId,

    });
    return costList;
  }
}
