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
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string[] } }
) {
  const { start, end } = await req.json();
  const whereClause =
    start && end
      ? {
          startedAt: {
            lte: start
          },
          endedAt: {
            gte: end
          }
        }
      : undefined;
  const drivers = await prisma.travel.groupBy({
    by: 'userId',
    _avg: {
      duration: true
    },
    where: whereClause
  });
  return NextResponse.json(drivers);
}
