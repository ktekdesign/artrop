import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getUserRole } from './utils/api-action';

const admin = [
  '/users',
  '/customers',
  '/ships',
  '/vehicles',
  '/dashboard',
  '/api/users',
  '/api/dashboard'
];
const api = ['/api/users', '/api/customers', '/api/ships', '/api/vehicles'];
const dashboard = '/api/dashboard/users';
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(request) {
    const role = await getUserRole(request);
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith(dashboard)) {
      return NextResponse.next();
    } else if (
      api.some((path) => pathname.startsWith(path)) &&
      ['GET', 'PUT'].includes(request.method)
    ) {
      return NextResponse.next();
    } else if (
      role !== 'ADMIN' &&
      admin.some((path) => pathname.startsWith(path))
    ) {
      return NextResponse.json({ status: 401 });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export { withAuth };
