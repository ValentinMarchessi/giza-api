import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/decorators';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDTO } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private user: UserService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.auth.login(body);
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.user.create(body);

    return this.auth.signJWT({ email: user.email, id: user.id });
  }
}
