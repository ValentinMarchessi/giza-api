import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude, Transform } from 'class-transformer';
import { Role } from 'src/v1/auth/roles.enum';
import { hash } from 'src/v1/auth/utils/encrypt';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Transform(({ value }) => hash(value))
  password: string;

  @Exclude()
  role?: Role | undefined;
}
