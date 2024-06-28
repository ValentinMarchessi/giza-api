import { Role } from '../roles.enum';

export type AuthUserJWT = {
  id: string;
  email: string;
  role: Role;
};
