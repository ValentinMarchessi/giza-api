import { Exclude, Expose } from 'class-transformer';
import { User } from './user.model';
import { PartialType } from '@nestjs/mapped-types';

@Exclude()
export class UserEntity {
  id: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() email: string;
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial.dataValues);
  }
}
