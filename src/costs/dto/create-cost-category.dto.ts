import { IsNotEmpty } from 'class-validator';

export class CreateCostCategoryDto {
  @IsNotEmpty()
  readonly categoryName: string;
  @IsNotEmpty()
  readonly categoryColor?: string;
  @IsNotEmpty()
  readonly categoryUrl?: string;
}
