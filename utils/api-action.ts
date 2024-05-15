import { Role } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const getUserId = async (req: NextRequest) =>
  (await getToken({ req }))?.sub;

export const getUserRole = async (req: NextRequest) => {
  const jwt = await getToken({ req });
  return jwt?.type as Role;
};

export const getUserInfo = async (req: NextRequest) => {
  const jwt = await getToken({ req });
  return jwt;
};
