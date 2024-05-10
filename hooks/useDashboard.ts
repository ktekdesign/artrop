import { getDashboard, getRecords } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { PieData } from '../app/pie-chart-dashboard';
import { API_DASHBOARD_URL } from '../utils/constants';
import { useMemo } from 'react';
import { DateValue, RangeValue } from '@nextui-org/react';
interface DashboardData {
  name: string;
  _count: {
    turn: number;
    operation: number;
    travel: number;
  };
}
export default function useDashboard(
  interval: string | number,
  custom: RangeValue<DateValue>
) {
  const url = API_DASHBOARD_URL;
  const fetchData = () =>
    getDashboard<DashboardData>({
      url,
      body: {
        interval,
        end: custom.end.toDate('America/Sao_Paulo'),
        start: custom.start.toDate('America/Sao_Paulo')
      }
    });

  const { data, error, isLoading } = useQuery({
    queryKey: [url, interval, custom.end.toString(), custom.start.toString()],
    queryFn: fetchData
  });

  const [turns, operations, travels] =
    useMemo(
      () =>
        data?.reduce(
          (accumulator: PieData[][], currentValue: DashboardData) => {
            accumulator[0].push({
              name: currentValue.name,
              value: currentValue._count.turn
            });
            accumulator[1].push({
              name: currentValue.name,
              value: currentValue._count.operation
            });
            accumulator[2].push({
              name: currentValue.name,
              value: currentValue._count.travel
            });
            return accumulator;
          },
          [[], [], []]
        ),
      [data]
    ) || [];

  return {
    error,
    isLoading,
    turns,
    operations,
    travels
  };
}
