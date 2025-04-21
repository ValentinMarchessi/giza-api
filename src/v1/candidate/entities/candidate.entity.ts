import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/v1/user/entities/user.model';

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
