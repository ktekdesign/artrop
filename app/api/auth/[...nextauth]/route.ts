import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../../utils/client';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        username: {
          label: 'CPF',
          type: 'text',
          placeholder: 'Insira o seu CPF'
        },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials, req) {
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
    async jwt({ token, user }) {
      if (user) {
        token.type = user.type;
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.type = token.type;
      }
      return Promise.resolve(session);
    }
  }
};
const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
