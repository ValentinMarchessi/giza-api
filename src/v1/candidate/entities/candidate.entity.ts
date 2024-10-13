import { Exclude, Expose } from 'class-transformer';
import { User } from './user.model';
import { Role } from 'src/v1/auth/roles.enum';

@Exclude()
export class UserEntity {
  id: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() bio: string;
  @Expose() email: string;
  @Expose() phoneNumber: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial.dataValues);
  }
}
