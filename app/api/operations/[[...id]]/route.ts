import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { getUserId } from '../../../../utils/api-action';
import { minutesDiff } from '../../../../utils/transform';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    return NextResponse.json(
      await prisma.operation.findUnique({
        where: { id: params.id[0] }
      })
    );
  }
  return NextResponse.json(await prisma.operation.findMany());
}

export async function POST(req: NextRequest) {
  const { turnId, shipId, ...data } = await req.json();
  const userId = await getUserId(req);

  const operation = await prisma.operation.create({
    data: {
      ...data,
      ship: {
        connect: { id: shipId }
      },
      turn: {
        connect: { id: turnId }
      },
      user: {
        connect: { id: userId }
      }
    }
  });

  return NextResponse.json(operation);
}

export async function PUT(req: NextRequest) {
  const { id, ...data } = await req.json();
  data.duration = minutesDiff(data.endedAt, data.startedAt);
  const userId = await getUserId(req);
  const operation = await prisma.operation.update({
    where: { id, userId },
    data
  });
  return NextResponse.json(operation);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    const userId = await getUserId(req);
    return NextResponse.json(
      await prisma.operation.delete({
        where: { id: params.id[0], userId }
      })
    );
  }
}
