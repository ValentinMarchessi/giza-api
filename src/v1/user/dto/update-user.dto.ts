import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude, Transform } from 'class-transformer';
const bcript = require('bcrypt') as typeof import('bcrypt');
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Transform(({ value }) => bcript.hashSync(value, 5))
  password: string;
}
