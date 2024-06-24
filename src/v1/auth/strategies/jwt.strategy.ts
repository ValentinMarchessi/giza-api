import { ExtractJwt, SecretOrKeyProvider, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { Role } from '../roles.enum';

export type AuthUserJWT = {
  id: string;
  email: string;
  role: Role;
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

  async validate(jwt: AuthUserJWT) {
    const { email, id, role } = jwt;

    const user = await this.user.findByEmail(email);

    if (!user || user.id !== id) {
      throw new UnauthorizedException();
    }

    console.log(
      `User ${role} ${user.firstName} ${user.lastName} [${id}] authorized `,
    );

    return jwt;
  }
}
