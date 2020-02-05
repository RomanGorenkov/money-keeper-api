import { IsNotEmpty, IsNumber, IsNumberString, MinLength } from 'class-validator';

export class CreateCostsDto {
  readonly costType: string;
  readonly costLocalizationKey: string;
  @IsNotEmpty()
  @MinLength(6)
  readonly costDescription: string;
  @IsNumber()
  costValue: number;
  @IsNumber()
  readonly costDate: number;
}
