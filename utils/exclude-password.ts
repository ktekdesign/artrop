import { User } from '@prisma/client';

type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, 'password'>]: Type[Property];
};
export function excludePassword(user: User): RemoveKindField<User> {
  const { password, ...data } = user;
  return data;
}
