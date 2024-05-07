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
      await prisma.travel.findUnique({
        where: { id: params.id[0] }
      })
    );
  }
  return NextResponse.json(await prisma.travel.findMany());
}

export async function POST(req: NextRequest) {
  const { operationId, ...data } = await req.json();
  const userId = await getUserId(req);
  if (userId) {
    const travel = await prisma.travel.create({
      data: {
        ...data,
        operation: {
          connect: { id: operationId }
        },
        user: {
          connect: { id: userId }
        }
      }
    });
    return NextResponse.json(travel);
  }
}

export async function PUT(req: NextRequest) {
  const { id, ...data } = await req.json();
  if (data.endedAt) data.duration = minutesDiff(data.endedAt, data.startedAt);

  const userId = await getUserId(req);
  return NextResponse.json(
    await prisma.travel.update({
      where: { id, userId },
      data
    })
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    const userId = await getUserId(req);

    return NextResponse.json(
      await prisma.travel.delete({
        where: { id: params.id[0], userId }
      })
    );
  }
}
