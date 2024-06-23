import { ExtractJwt, SecretOrKeyProvider, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt') as typeof import('bcrypt');

export type AuthUserJWT = {
  id: string;
  email: string;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private user: UserService,
    private config: ConfigService,
  ) {
    const provider: SecretOrKeyProvider = (req, rawJwtToken, done) => {
      const jwtSecret = this.config.get<string>('jwt.secret');
      // console.log('rawJwtToken', rawJwtToken);
      // We can decode token here
      done(null, jwtSecret);
    };

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: provider,
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
