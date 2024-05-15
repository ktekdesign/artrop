import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../utils/client';
import { excludePassword } from '../../users/[[...id]]/route';
import { getUserInfo } from '../../../../utils/api-action';

export async function POST(req: NextRequest) {
  const { interval, start, end } = await req.json();
  const today = new Date(new Date().setDate(new Date().getDate()));
  const endAt = interval !== 'custom' ? today : new Date(end);
  endAt.setHours(23, 59, 59, 0);
  const startAt =
    interval !== 'custom'
      ? new Date(new Date().setDate(today.getDate() - interval))
      : new Date(start);
  startAt.setHours(23, 59, 59, 0);
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
  const { id, type } = (await getUserInfo(req)) || {};
  if (type !== 'ADMIN') {
    const driver = await prisma.user.findUnique({
      where: { id },
      include: {
        turn: {
          where: { status: false },
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
    if (!driver) return NextResponse.json([]);
    return NextResponse.json([excludePassword(driver)]);
  }
  const drivers = await prisma.user.findMany({
    where: {
      type: 'DRIVER'
    },
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
  return NextResponse.json(drivers.map((driver) => excludePassword(driver)));
}
