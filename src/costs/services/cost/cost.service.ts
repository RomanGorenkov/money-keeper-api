import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Costs } from '../../interfaces/costs.interface';
import { CreateCostsDto } from '../../dto/create-costs.dto';
import { UserCosts } from '../../interfaces/user-costs.interface';
import { dateTimeInterval } from '../../constants/date-time-interval';
import { CreateCostCategoryDto } from '../../dto/create-cost-category.dto';
import { CostCategory } from '../../interfaces/cost-category.interface';

@Injectable()
export class CostService {

  constructor(
    @InjectModel('Costs') private readonly costsModel: Model<Costs>,
    @InjectModel('CostCategories') private readonly costCategoriesModel: Model<CostCategory>,
  ) {
  }

  async addCostCategory(costCategoryData: CreateCostCategoryDto, userId: string) {
    const newCostCategory = await this.costCategoriesModel({ userId, ...costCategoryData });
    await newCostCategory.save();
  }

  async addCost(costData: CreateCostsDto, userId: string): Promise<UserCosts[]> {
    const newCost = await this.costsModel({ userId, ...costData });
    await newCost.save();
    return await this.getAllUserCosts(userId);
  }

  async getUserCategoryCost(categoryName: string, userId: string, startDate: number, endDate: number): Promise<CreateCostsDto[]> {
    const costList: CreateCostsDto[] = await this.costsModel.find({
      costType: categoryName,
      costDate: { $gt: startDate, $lt: endDate },
      userId,

    });
    return costList;
  }

  async getAllUserCosts(userId: string, startDate: number = 0, endDate: number = this.getTomorrowDate()) {
    const allCostsList: UserCosts[] = await this.costsModel.aggregate(
      [
        {
          $match: {
            userId: String(userId),
            costDate: { $gt: startDate, $lt: endDate },
          },
        },
        {
          $group:
            {
              _id: '$costType',
              costSum: { $sum: '$costValue' },
              costList: {
                $push: {
                  costDate: '$costDate',
                  costValue: '$costValue',
                  costDescription: '$costDescription',
                  costColor: '$costColor',
                },
              },

            },
        },
      ],
    );
    return allCostsList;
  }

  getTodayDate() {
    return new Date(Date.now()).setHours(0, 0, 0, 0);
  }

  getTomorrowDate() {
    return this.getTodayDate() + dateTimeInterval.day;
  }
}
