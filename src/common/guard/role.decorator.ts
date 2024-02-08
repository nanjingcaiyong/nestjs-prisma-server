import { SetMetadata } from '@nestjs/common';
import { AUTHORIZATION_ROLE_KEY } from '../constant';
export const Roles = (...roles: string[]) =>
  SetMetadata(AUTHORIZATION_ROLE_KEY, roles);
