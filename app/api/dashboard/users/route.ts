import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';

export async function POST(req: NextRequest) {
  const { interval, start, end } = await req.json();
  const today = new Date(new Date().setDate(new Date().getDate() + 1));
  const endAt = interval !== 'custom' ? today : new Date(end);
  endAt.setHours(0, 0, 0, 0);
  const startAt =
    interval !== 'custom'
      ? new Date(new Date().setDate(today.getDate() - interval))
      : new Date(start);
  startAt.setHours(0, 0, 0, 0);
  const whereClause =
    start && end
      ? {
          startedAt: {
            gte: startAt
          },
          endedAt: {
            lte: endAt
          }
        }
      : undefined;
  const drivers = await prisma.user.findMany({
    include: {
      turn: {
        where: whereClause,
        orderBy: {
          startedAt: 'desc'
        },
        include: {
          operation: {
            orderBy: {
              startedAt: 'desc'
            },
            include: {
              travel: {
                orderBy: {
                  startedAt: 'desc'
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
