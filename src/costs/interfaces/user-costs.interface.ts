import { Costs } from './costs.interface';

export interface UserCosts {
  _id: string;
  costSum: number;
  costList: Costs[];
}
