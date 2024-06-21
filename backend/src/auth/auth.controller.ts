import { UsersService } from 'src/users/users.service';
import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { Response } from 'express';
import { ApiCookieAuth } from '@nestjs/swagger';
import { GetCurrentUser } from './decorators/getCurrentUser.decorator';
import { RtGuard } from './Guards/refresh.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TfaDto } from './dto/tfa.dto';
import { stat } from 'fs';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private UsersService: UsersService,
  ) { }
  @Get('42')
  @UseGuards(AuthGuard('42'))
  fortyTwoAuth() {
    // This route will trigger the authentication process
  }

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  fortyTwoCallback(@Res() res) { }

  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: AuthDto) {
    const tokens: Tokens = await this.authService.login(dto);
    res.cookie('access_token', tokens.access_token, { httpOnly: false });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: false,
      path: '/auth',
    });
    res.setHeader('access_token', tokens.access_token);
  }

  @Post('checkusername')
  async isUsernameUnique(@Body() req, @Res() res: Response) {
    const result = await this.UsersService.getUserByUsername(req.username);
    if (result) {
      res.status(HttpStatus.FOUND).send({ message: 'Username already exists' });
    } else {
      res.status(HttpStatus.OK).send({ message: 'Username is unique' });
    }
  }

  @Post('checkemail')
  async isEmailUnique(@Body() req, @Res() res) {
    const result = await this.UsersService.getUserByEmail(req.email);
    if (result) {
      res.status(HttpStatus.FOUND).send({ message: 'Email already exists' });
    } else {
      res.status(HttpStatus.OK).send({ message: 'Email is unique' });
    }
  }
  @Post('signup')
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ): Promise<Tokens> {
    const tokens: Tokens = await this.authService.signup(dto);
    res.cookie('access_token', tokens.access_token, { httpOnly: false });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: false,
      path: '/auth',
    });
    return tokens;
  }

  @Get('refresh')
  @ApiCookieAuth('refresh_token')
  @UseGuards(RtGuard)
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUser('userId') userId: string,
  ) {
    const tokens: Tokens = await this.authService.refresh(refreshToken, userId);

    res.cookie('access_token', tokens.access_token, { httpOnly: false });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: false,
      path: '/auth',
    });

    return { message: 'ok' };
  }
  @Get('logout')
  @ApiCookieAuth('refresh_token')
  @UseGuards(RtGuard)
  async logout(
    @GetCurrentUser('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.redirect('http://localhost:3000');
  }

  @Get('generate2fa/:email')
  async generate2fa(@Param('email') email: string) {
    const { qrCode, tfaToken } = await this.authService.generateTwoFactorAuthSecret(email);
    return { qrCode, tfaToken };
  }

  @Post('validate2fa')
  async validate2fa(@Body() tfaValidation: TfaDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.validateTwoFactorAuth(tfaValidation.otp, tfaValidation.tfaToken);
    if (!data.isValid) {
      return new BadRequestException('Invalid OTP');
    }
    const tokens = data.tokens;
    res.cookie('access_token', tokens.access_token, { httpOnly: false });
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: false, path: '/auth' });
    res.status(HttpStatus.OK).send({ message: 'ogin succes' });
  }

}