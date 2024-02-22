import { SetMetadata } from '@nestjs/common';
import { AUTHORIZATION_ROLE_KEY } from '@/common';
export const Roles = (...roles: string[]) => {
  console.log(roles);
  return SetMetadata(AUTHORIZATION_ROLE_KEY, roles);
};
