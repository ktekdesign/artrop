import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
declare module 'next-auth' {
  export interface Session {
    id?: string;
  }
}
const prisma = new PrismaClient();

const handlers = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Login',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'CPF',
          type: 'text',
          placeholder: 'Insira o seu CPF'
        },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.username || !credentials?.password)
          throw new Error('Credenciais não validas');

        const user = await prisma.user.findUnique({
          where: { govID: credentials.username }
        });

        if (user) {
          if (user?.password !== credentials.password)
            throw new Error('A senha não esta correta');

          return user;
        }
        throw new Error('Essa conta não exite');
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token }) {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      return Promise.resolve(token); // ...here
    },
    async session({ session, token }) {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      if (session) {
        session.id = token.sub; // token.uid or token.sub both work
      }
      return Promise.resolve(session);
    }
  }
});

export { handlers as GET, handlers as POST };
