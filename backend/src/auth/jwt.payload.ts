import { Role } from '../user/entity/role.enum';

export class JWTPayload {
  id: number;
  email: string;
  role: Role;
}
