import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.model';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login-dto';
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

  async login({ email, password }: LoginDTO) {
    const user = await this.users.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    const access_token = this.jwt.sign({
      email: user.email,
      id: user.id,
    });

    return { access_token };
  }

  signJWT(body: { email: string; id: string }) {
    return {
      access_token: this.jwt.sign(body),
    };
  }
}
