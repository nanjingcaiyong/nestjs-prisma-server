import { SetMetadata } from '@nestjs/common';
import { AUTHORIZATION_AUTH_KEY, Auth } from '@/common';
export const Auths = (...auths: Auth[]) =>
  SetMetadata(AUTHORIZATION_AUTH_KEY, auths);
