import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function hasOpen<T>({ url }: { url: string }) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((data) => data.json() as T);
}

export const getUserId = async (req: NextRequest) =>
  (await getToken({ req }))?.sub;
