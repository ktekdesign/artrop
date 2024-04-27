import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const getUserId = async (req: NextRequest) =>
  (await getToken({ req }))?.sub;
