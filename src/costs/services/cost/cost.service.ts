import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Costs } from '../../interfaces/costs.interface';
import { CreateCostsDto } from '../../dto/create-costs.dto';
import { UserCosts } from '../../interfaces/user-costs.interface';
import { dateTimeInterval } from '../../constants/date-time-interval';
import { UsersService } from '../../../users/services/users.service';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class CostService {

  constructor(
    @InjectModel('Costs') private readonly costsModel: Model<Costs>,
    private userService: UsersService,
    private currencyService: CurrencyService,
  ) {
  }

  async addCost(costData: CreateCostsDto, userId: string) {
    console.log(costData);
    const userCurrency = await this.userService.getUserCurrency(userId);
    costData.costValue = costData.costValue * this.currencyService.currencyList[userCurrency];
    console.log(this.currencyService.currencyList[userCurrency]);
    const newCost = await this.costsModel({ userId, ...costData });
    await newCost.save();
  }

  async getUserCategoryCost(categoryName: string, userId: string, startDate: number, endDate: number): Promise<CreateCostsDto[]> {
    const costList: CreateCostsDto[] = await this.costsModel.find({
      costType: categoryName,
      costDate: { $gt: startDate, $lt: endDate },
      userId,

    });
    return costList;
  }

  async getAllUserCosts(userId: string, startDate: number = this.getTodayDate(), endDate: number = this.getTomorrowDate()) {
    const userCurrency = await this.userService.getUserCurrency(userId);
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
                  costLocalizationKey: '$costLocalizationKey',
                },
              },

            },
        },
      ],
    );
    if (userCurrency !== 'BYN') {
      return  await this.currencyService.convertUserCosts(userCurrency, allCostsList);
    } else {
      return allCostsList;
    }
  }

  getTodayDate() {
    return new Date(Date.now()).setHours(0, 0, 0, 0);
  }

  getTomorrowDate() {
    return this.getTodayDate() + dateTimeInterval.day;
  }
}
