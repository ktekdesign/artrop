import { NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';

export async function GET(
  req: Request,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    return NextResponse.json(
      await prisma.vehicle.findUnique({
        where: { id: params.id[0] }
      })
    );
  }
  return NextResponse.json(await prisma.vehicle.findMany());
}

export async function POST(req: Request) {
  return NextResponse.json(
    await prisma.vehicle.create({
      data: await req.json()
    })
  );
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string[] } }
) {
  const data = await req.json();
  const id = params?.id[0];
  return NextResponse.json(
    await prisma.vehicle.update({
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
      await prisma.vehicle.delete({
        where: { id: params.id[0] }
      })
    );
  }
}
