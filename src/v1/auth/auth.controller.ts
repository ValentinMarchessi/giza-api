import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/decorators';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private user: UserService,
  ) {}

  @Post('login')
  async login(@Request() req: Req) {
    if (!req.user) {
      throw new BadRequestException('No user provided for auth');
    }
    return this.auth.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.user.create(body);

    return this.auth.signJWT({ email: user.email, id: user.id });
  }
}
