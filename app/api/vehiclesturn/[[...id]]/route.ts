import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { getToken } from 'next-auth/jwt';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    return NextResponse.json(
      await prisma.vehiclesTurn.aggregate({
        _max: { endedKm: true },
        where: { vehicleId: params.id[0] }
      })
    );
  }
  return NextResponse.json({ _max: { endedKm: 0 } });
}

export async function POST(req: NextRequest) {
  const { turnId, vehicleId, endedKm, startedKm } = await req.json();
  const token = await getToken({ req });
  if (!token) return NextResponse.json({ status: 401 });
  await prisma.vehiclesTurn.updateMany({
    where: {
      vehicleId,
      endedKm: 0,
      turnId
    },
    data: { endedKm }
  });
  return NextResponse.json(
    await prisma.vehiclesTurn.create({
      data: {
        startedKm,
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
