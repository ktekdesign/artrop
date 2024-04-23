import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { getUserId } from '../../../../utils/api-action';

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
    },
    select: {
      id: true,
      status: true,
      turnId: true,
      type: true
    }
  });

  return NextResponse.json(operation);
}

export async function PUT(req: NextRequest) {
  const { turnId, id, ...data } = await req.json();
  const userId = await getUserId(req);
  const operation = await prisma.operation.update({
    where: { id, userId, turnId },
    data,
    select: {
      id: true,
      status: true,
      turnId: true,
      type: true,
      travels: {
        select: {
          id: true,
          status: true,
          weight: true
        }
      }
    }
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
