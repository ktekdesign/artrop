import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
//import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
// prisma.$use(async (params, next) => {
//   if (params.model === 'User' && ['create', 'update'].includes(params.action)) {
//     const hashedPassword = await hash(params.args.data.password, 10);
//     params.args.data.password = hashedPassword;
//   }
//   const result = await next(params);

//   return result;
// });
export { prisma };
//const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma = new PrismaClient().$extends({
//   query: {
//     user: {
//       $allOperations({ operation, args, query }) {
//         if (['create', 'update'].includes(operation) && args.data.password) {
//           args.data.password = bcrypt.hashSync(args.data.password, 10);
//         }
//         return query(args);
//       }
//     }
//   }
// });

//if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
