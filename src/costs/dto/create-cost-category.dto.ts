import { IsNotEmpty } from 'class-validator';

export class CreateCostCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  readonly color?: string;
}
