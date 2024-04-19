import { NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';

export async function GET(
  req: Request,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    return NextResponse.json(
      await prisma.ship.findUnique({
        where: { id: params.id[0] }
      })
    );
  }
  return NextResponse.json(await prisma.ship.findMany());
}

export async function POST(req: Request) {
  return NextResponse.json(
    await prisma.ship.create({
      data: await req.json()
    })
  );
}

export async function PUT(req: Request) {
  const { id, ...data } = await req.json();
  return NextResponse.json(
    await prisma.ship.update({
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
      await prisma.ship.delete({
        where: { id: params.id[0] }
      })
    );
  }
}
