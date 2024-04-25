import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  const { turnId, vehicleId, ...data } = await req.json();
  const token = await getToken({ req });
  if (!token) return NextResponse.json({ status: 401 });

  return NextResponse.json(
    await prisma.vehiclesTurn.create({
      data: {
        ...data,
        turn: {
          connect: { id: turnId }
        },
        vehicle: {
          connect: { id: vehicleId }
        },
        user: {
          connect: { id: token.sub }
        }
      }
    })
  );
}
