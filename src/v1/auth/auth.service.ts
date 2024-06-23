import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.model';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt') as typeof import('bcrypt');

const { BAD_REQUEST } = HttpStatus;

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid Email', BAD_REQUEST);
    }

    const validated = await bcrypt.compare(pass, user.password);

    if (!validated) {
      throw new UnauthorizedException();
    } else {
      const { password, ...result } = user;
      return result.dataValues;
    }
  }

  async login(user: any) {
    return {
      access_token: this.jwt.sign({
        email: user.email,
        id: user.id,
      }),
    };
  }

  signJWT(body: { email: string; id: string }) {
    return {
      access_token: this.jwt.sign(body),
    };
  }
}
