import { IsNotEmpty, IsNumber, IsNumberString, MinLength } from 'class-validator';

export class CreateCostsDto {
  readonly costType: string;
  @IsNotEmpty()
  @MinLength(6)
  readonly costDescription: string;
  @IsNumberString()
  readonly costValue: number;
  @IsNumber()
  readonly costDate: number;
}
