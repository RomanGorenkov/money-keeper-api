import { Body, Controller, Get, HttpStatus, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { CostService } from '../../services/cost/cost.service';
import { CreateCostsDto } from '../../dto/create-costs.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('costs')
export class CostsController {
  constructor(
    private costsService: CostService,
  ) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addCost(@Request() req, @Res() res, @Body() createCostDto: CreateCostsDto) {
    await this.costsService.addCost(createCostDto, req.user.userId);
    return res.status(HttpStatus.OK).json({
      message: 'Cost has been submitted successfully!',
    });
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
    @Param('startDate') startDate: number,
    @Param('endDate') endDate: number,
  ) {
    const costList = await this.costsService.getAllUserCosts(req.user.userId, +startDate, +endDate);
    return res.status(HttpStatus.OK).json(costList);
  }

}
