import { Body, Controller, HttpStatus, Post, Res, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('registration')
  async registration(@Res() res, @Body() createUserDTO: CreateUserDto) {
    const answer: string = await this.authService.registration(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: answer,
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    // return req.user;
    return this.authService.login(req.user);
  }
}
