import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../utils/client';

// export async function GET() {
//   const drivers = await prisma.travel.groupBy({
//     by: 'userId',
//     _avg: {
//       duration: true
//     }
//   });

//   return NextResponse.json(drivers);
// }
export async function GET() {
  const operations = await prisma.operation.groupBy({
    by: 'type',
    _count: {
      type: true
    }
  });
  return NextResponse.json(operations);
}

export async function POST(req: NextRequest) {
  const { interval } = await req.json();
  const end = new Date();
  const start = new Date(new Date().setDate(end.getDate() - interval));

  const whereClause =
    start && end
      ? {
          startedAt: {
            gte: start
          },
          endedAt: {
            lte: end
          }
        }
      : undefined;
  const operations = await prisma.operation.groupBy({
    by: 'type',
    _count: {
      type: true
    },
    where: whereClause
  });
  return NextResponse.json(operations);
}
