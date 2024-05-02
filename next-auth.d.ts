import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: User;
  }
  interface User extends DefaultUser {
    id: string;
    type: Role;
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    type: Role;
  }
}
