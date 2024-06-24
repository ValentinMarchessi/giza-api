import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login-dto';
import { UserEntity } from '../user/entities/user.entity';
import { AuthUserJWT } from './strategies/jwt.strategy';
import * as crypt from './utils/encrypt';
import { User } from '../user/entities/user.model';

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

    if (!crypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }

    return new UserEntity(user);
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.users.findByEmail(email);
    if (!user || !crypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    const { access_token } = this.signJWT(user);

    return { access_token, id: user.id as string };
  }

  signJWT(user: User) {
    const body: AuthUserJWT = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwt.sign(body),
    };
  }
}
