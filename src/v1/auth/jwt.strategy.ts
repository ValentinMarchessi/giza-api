import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from '../user/user.service';
const bcrypt = require('bcrypt') as typeof import('bcrypt');

export type AuthUserJWT = {
  id: string;
  email: string;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private user: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AuthUserJWT) {
    const { email, id } = payload;

    console.log(`Validating JWT`, payload);

    const user = await this.user.findByEmail(email);

    if (!user || user.id !== id) {
      throw new UnauthorizedException();
    }

    console.log(
      `User ${user.firstName} ${user.lastName} with ID:${user.id} authorized`,
    );

    return { id, email };
  }
}
