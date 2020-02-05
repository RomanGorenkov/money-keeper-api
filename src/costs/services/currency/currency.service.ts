import { Injectable, OnModuleInit } from '@nestjs/common';
import got from 'got';
import { CurrencyApiAnswer } from '../../interfaces/currency-api-answer.interface';
import { UserCosts } from '../../interfaces/user-costs.interface';
import { Costs } from '../../interfaces/costs.interface';

@Injectable()
export class CurrencyService implements OnModuleInit {

  currencyList = {
    USD: 0,
    EUR: 0,
    RUB: 0,
    BYN: 1,
  };

  async onModuleInit(): Promise<void> {
    await this.setStartCurrency();
    console.log(this.currencyList);
  }

  async convertUserCosts(newCurrency: string, userCosts: UserCosts[]) {
    const currencyData = await this.getCurrencyData(newCurrency);
    return userCosts.map(costCategory => {
      costCategory.costSum = this.convertFromDefaultCurrency(currencyData, costCategory.costSum);
      costCategory.costList = this.convertCostsList(currencyData, costCategory.costList);
      return costCategory;
    });
  }

  convertCostsList(currencyData: CurrencyApiAnswer, costList: Costs[]) {
    return costList.map(cost => {
      cost.costValue = this.convertFromDefaultCurrency(currencyData, cost.costValue);
      return cost;
    });
  }

  convertFromDefaultCurrency(currencyData: CurrencyApiAnswer, value: number) {
    this.currencyList[currencyData.Cur_Abbreviation] = 1 / currencyData.Cur_Scale * currencyData.Cur_OfficialRate;
    return value * currencyData.Cur_Scale / currencyData.Cur_OfficialRate;
  }

  convertToDefaultCurrency(currencyData: CurrencyApiAnswer, value: number) {
    return value / currencyData.Cur_Scale * currencyData.Cur_OfficialRate;
  }

  async getCurrencyData(currency: string): Promise<CurrencyApiAnswer> {
    const response = await got(`http://www.nbrb.by/API/ExRates/Rates/${currency}?ParamMode=2`);
    return JSON.parse(response.body);
  }

  async getCurrencyRate(currency: string) {
    const response = await got(`http://www.nbrb.by/API/ExRates/Rates/${currency}?ParamMode=2`);
    const currencyData: CurrencyApiAnswer = JSON.parse(response.body);
    return 1 / currencyData.Cur_Scale * currencyData.Cur_OfficialRate;
  }

  async setStartCurrency() {
    for (const currencyName of Object.keys(this.currencyList)) {
      if (currencyName === 'BYN') {
        continue;
      }
      this.currencyList[currencyName] = await this.getCurrencyRate(currencyName);
    }
  }

}
