export interface Costs {
  readonly userId?: string;
  readonly costType: string;
  readonly costDescription: string;
  costValue: number;
  readonly costDate: number;
  readonly costColor: string;
}
