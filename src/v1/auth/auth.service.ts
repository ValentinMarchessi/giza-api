import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login-dto';
import { UserEntity } from '../user/entities/user.entity';
import * as crypt from './utils/encrypt';
import { User } from '../user/entities/user.model';
import { AuthUserJWT } from './types/jwt';

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw UserService.EXCEPTIONS.NOT_FOUND;
    }

    if (!crypt.compare(pass, user.password)) {
      throw UserService.EXCEPTIONS.UNAUTHORIZED;
    }

    return new UserEntity(user);
  }

  async login({ email, password }: LoginDTO) {
    try {
      const user = await this.users.findByEmail(email);
      const isAuthored = await crypt.compare(password, user.password);
      if (!isAuthored) {
        throw UserService.EXCEPTIONS.UNAUTHORIZED;
      }
      const { access_token } = this.signJWT(user);

      return { access_token, id: user.id as string };
    } catch (error) {
      console.error(error);
      // Catch any errors and throw an UnauthorizedException to avoid sending sensitive information
      // to the client.
      throw UserService.EXCEPTIONS.UNAUTHORIZED;
    }
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
