import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { getToken } from 'next-auth/jwt';

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
  const { shipId, ...data } = await req.json();
  const token = await getToken({ req });
  if (!token) return NextResponse.json({ status: 401 });
  const turn = await prisma.turn.findFirst({
    select: { id: true },
    where: { userId: token.sub, status: false }
  });
  if (turn) {
    const operation = await prisma.operation.create({
      data: {
        ...data,
        ship: {
          connect: { id: shipId }
        },
        turn: {
          connect: { id: turn.id }
        }
      }
    });
    return NextResponse.json({
      turnId: turn.id,
      id: operation.id,
      status: operation.status,
      type: operation.type
    });
  }

  return NextResponse.json(null);
}

export async function PUT(req: Request) {
  const { id, ...data } = await req.json();
  return NextResponse.json(
    await prisma.operation.update({
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
      await prisma.operation.delete({
        where: { id: params.id[0] }
      })
    );
  }
}
