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
import { UserEntity } from '../user/entities/user.entity';
import { AuthUserJWT } from './strategies/jwt.strategy';
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
    }

    return new UserEntity(user);
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.users.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    const { access_token } = this.signJWT({
      email: user.email,
      id: user.id,
      role: user.role,
    });

    return { access_token, id: user.id as string };
  }

  signJWT(body: AuthUserJWT) {
    return {
      access_token: this.jwt.sign(body),
    };
  }
}
