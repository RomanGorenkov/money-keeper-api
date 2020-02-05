import { Body, Controller, Post, Res, Request, UseGuards, HttpStatus, Get, Header, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../services/users.service';
import { LanguageData } from '../interfaces/language-data-interface';
import { CurrencyData } from '../interfaces/currency-data.interface';
import { UserSettings } from '../interfaces/user-settings.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/language')
  async changeUserLanguage(@Request() req, @Res() res, @Body() languageData: LanguageData) {
    await this.usersService.changeUserLanguage(languageData.language, req.user.userId);
    return res.status(HttpStatus.OK).json({
      message: 'Language has been submitted successfully!',
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/currency')
  async changeUserCurrency(@Request() req, @Res() res, @Body() currencyData: CurrencyData) {
    await this.usersService.changeUserCurrency(currencyData.currency, req.user.userId);
    return res.status(HttpStatus.OK).json({
      message: 'Currency has been submitted successfully!',
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/settings')
  async getUserSettings(@Request() req, @Res() res) {
    const userSettings = await this.usersService.getUserSettings(req.user.userId);
    return res.status(HttpStatus.OK).json(userSettings);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/settings')
  @UseInterceptors(FileInterceptor('userAvatarUrl'))
  async uploadFile(@Request() req, @Res() res, @UploadedFile() file, @Body() settings: UserSettings) {
    const userSettings = await this.usersService.setUserSettings(req.user.userId, settings, file);
    return res.status(HttpStatus.OK).json(userSettings);
  }
}
