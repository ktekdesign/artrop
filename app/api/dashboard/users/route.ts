import { NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { Status } from '@prisma/client';

export async function GET() {
  const drivers = await prisma.user.findMany({
    include: {
      turn: {
        where: { status: false },
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
      }
    }
  });

  return NextResponse.json(drivers);
}
