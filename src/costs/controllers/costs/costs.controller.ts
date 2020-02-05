import { Body, Controller, Get, HttpStatus, Param, Post, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CostService } from '../../services/cost/cost.service';
import { CreateCostsDto } from '../../dto/create-costs.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateCostCategoryDto } from '../../dto/create-cost-category.dto';
import { CostCategoryService } from '../../services/cost-category/cost-category.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('costs')
export class CostsController {
  constructor(
    private costsService: CostService,
    private costCategoryService: CostCategoryService,
  ) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addCost(@Request() req, @Res() res, @Body() createCostDto: CreateCostsDto) {
    await this.costsService.addCost(createCostDto, req.user.userId);
    return res.status(HttpStatus.OK).json();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-category')
  @UseInterceptors(FileInterceptor('categoryImage'))
  async addCostCategory(@Request() req, @Res() res, @UploadedFile() file, @Body() createCostCategory: CreateCostCategoryDto) {
    const imageUrl = await this.costCategoryService.addCostCategory(createCostCategory, req.user.userId, file);
    return res.status(HttpStatus.OK).json(imageUrl);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-custom-categories')
  async getCustomCategories(@Request() req, @Res() res) {
    const categoryList =  await this.costCategoryService.getCustomUserCategoryList(req.user.userId);
    return res.status(HttpStatus.OK).json(categoryList);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('category/:name/:startDate/:endDate')
  async getUserCategoryCost(
    @Request() req,
    @Res() res,
    @Param('name') categoryName: string,
    @Param('startDate') startDate: number,
    @Param('endDate') endDate: number,
  ) {
    const costList = await this.costsService.getUserCategoryCost(categoryName, req.user.userId, startDate, endDate);
    return res.status(HttpStatus.OK).json(costList);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all-categories/:startDate/:endDate')
  async getAllUserCosts(
    @Request() req,
    @Res() res,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const costList = await this.costsService.getAllUserCosts(req.user.userId, parseInt(startDate, 10), parseInt(endDate, 10));
    return res.status(HttpStatus.OK).json(costList);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all-categories')
  async getTodayAllUserCosts(
    @Request() req,
    @Res() res,
  ) {
    const costList = await this.costsService.getAllUserCosts(req.user.userId);
    return res.status(HttpStatus.OK).json(costList);
  }

}
