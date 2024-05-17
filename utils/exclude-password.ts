import { User } from '@prisma/client';

export function excludePassword(user: User) {
  const { password, ...data } = user;
  return data;
}
