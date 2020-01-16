import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CostCategory } from '../../interfaces/cost-category.interface';
import { Model } from 'mongoose';
import { CreateCostCategoryDto } from '../../dto/create-cost-category.dto';
import { CloudinaryService } from '../../../shared/services/cloudinary/cloudinary.service';

@Injectable()
export class CostCategoryService {

  constructor(
    @InjectModel('CostCategories') private readonly costCategoriesModel: Model<CostCategory>,
    private cloudinaryService: CloudinaryService,
  ) {
  }

  async addCostCategory(costCategoryData: CreateCostCategoryDto, userId: string, imageFile: any) {
    costCategoryData.name = costCategoryData.name.toLowerCase();
    const imageUrl = await this.cloudinaryService.uploadImg(imageFile);
    const newCostCategory = await this.costCategoriesModel({ userId, imageUrl, ...costCategoryData });
    await newCostCategory.save();
    return imageUrl;
  }

  async getCustomUserCategoryList(userId: string) {
    return await this.costCategoriesModel.find({ userId }, {
      _id: 0,
      userId: 0,
      __v: 0,
    });
  }
}
