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
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(request) {
    const role = await getUserRole(request);
    if (
      role !== 'ADMIN' &&
      admin.some((path) => request.nextUrl.pathname.startsWith(path))
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
