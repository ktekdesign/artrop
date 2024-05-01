import { NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { User } from '@prisma/client';
//import { encrypt, hash } from '../../../../security';

function excludePassword(user: User) {
  const { password, ...data } = user;
  return data;
}
export async function GET(
  req: Request,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    const user = await prisma.user.findUnique({
      where: { id: params.id[0] }
    });
    if (user) return NextResponse.json(excludePassword(user));
  }
  return NextResponse.json(
    (await prisma.user.findMany()).map((user: User) => excludePassword(user))
  );
}

export async function POST(req: Request) {
  return NextResponse.json(
    excludePassword(
      await prisma.user.create({
        data: await req.json()
      })
    )
  );
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string[] } }
) {
  const data = await req.json();
  const id = params?.id[0];
  return NextResponse.json(
    excludePassword(
      await prisma.user.update({
        where: { id },
        data
      })
    )
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string[] } }
) {
  if (params?.id) {
    return NextResponse.json(
      excludePassword(
        await prisma.user.delete({
          where: { id: params.id[0] }
        })
      )
    );
  }
}
