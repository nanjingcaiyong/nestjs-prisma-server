import { SetMetadata } from '@nestjs/common';
import { AUTHORIZATION_ROLE_KEY, Role } from '@/common';
export const Roles = (...roles: Role[]) =>
  SetMetadata(AUTHORIZATION_ROLE_KEY, roles);
