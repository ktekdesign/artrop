import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { getToken } from 'next-auth/jwt';
import { getUserId } from '../../../../utils/api-action';
import { Status } from '@prisma/client';
import { getVars } from '../../../../utils/getVars';
import { minutesDiff } from '../../../../utils/transform';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string[] } }
) {
  if (params?.id && params?.id[0] === 'open') {
    const userId = await getUserId(req);
    const where = {
      status: false,
      userId
    };
    const turn = await prisma.turn.findFirst({
      where,
      include: {
        operation: {
          where: { status: false },
          include: {
            travel: {
              where: {
                status: {
                  not: Status.FIM_VIAGEM
                }
              }
            }
          }
        }
      }
    });

    return NextResponse.json(
      turn ? { ...turn, operation: getVars(turn.operation) } : null
    );
  } else if (params?.id) {
    return NextResponse.json(
      await prisma.turn.findUnique({
        where: { id: params.id[0] }
      })
    );
  }
  return NextResponse.json(await prisma.turn.findMany());
}

export async function POST(req: NextRequest) {
  const { customerId, vehicleId, ...data } = await req.json();
  const token = await getToken({ req });
  if (!token) return NextResponse.json({ status: 401 });
  const turn = await prisma.turn.create({
    data: {
      ...data,
      customer: {
        connect: { id: customerId }
      },
      user: {
        connect: { id: token.sub }
      }
    }
  });
  await prisma.vehiclesTurn.create({
    data: {
      turn: {
        connect: { id: turn.id }
      },
      vehicle: {
        connect: { id: vehicleId }
      },
      user: {
        connect: { id: token.sub }
      }
    }
  });
  return turn ? NextResponse.json({ turnId: turn.id }) : NextResponse.json({});
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string[] } }
) {
  const data = await req.json();
  if (data.endedKm) {
    data.duration = minutesDiff(data.endedAt, data.startedAt);
    data.status = true;
    data.endedAt = new Date();
  }
  const id = params?.id[0];
  return NextResponse.json(
    await prisma.turn.update({
      where: { id },
      data
    })
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    return NextResponse.json(
      await prisma.turn.delete({
        where: { id: params.id[0] }
      })
    );
  }
}
