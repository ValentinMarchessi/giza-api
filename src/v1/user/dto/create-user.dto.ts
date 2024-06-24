import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/v1/auth/roles.enum';
import { hash } from 'src/v1/auth/utils/encrypt';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => hash(value))
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(Role)
  role: Role;
}
