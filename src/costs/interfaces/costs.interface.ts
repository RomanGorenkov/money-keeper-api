export interface Costs {
  readonly userId?: string;
  readonly costType: string;
  readonly costDescription: string;
  costValue: string;
  readonly costDate: number;
}
