import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../utils/client';
import { getUserId } from '../../../../../utils/api-action';

export async function GET() {
  const drivers = await prisma.user.findMany({
    select: {
      name: true,
      _count: {
        select: {
          turn: true,
          operation: true,
          travel: true
        }
      }
    }
  });

  return NextResponse.json(drivers);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string[] } }
) {
  const { start, end } = await req.json();
  const whereClause =
    start && end
      ? {
          where: {
            startedAt: {
              lte: start
            },
            endedAt: {
              gte: end
            }
          }
        }
      : true;
  const drivers = await prisma.user.findMany({
    select: {
      _count: {
        select: {
          turn: whereClause,
          operation: whereClause,
          travel: whereClause
        }
      }
    }
  });

  return NextResponse.json(drivers);
}
