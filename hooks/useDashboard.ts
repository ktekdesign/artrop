import { getRecords } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { PieData } from '../app/pie-chart-dashboard';
import { API_DASHBOARD_URL } from '../utils/constants';
import { useMemo } from 'react';
interface DashboardData {
  name: string;
  _count: {
    turn: number;
    operation: number;
    travel: number;
  };
}
export default function useDashboard() {
  const url = API_DASHBOARD_URL;
  const fetchData = () => getRecords<DashboardData>({ url });

  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: fetchData
  });

  const [turns, operations, travels] =
    useMemo(() => {
      return data?.reduce(
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
      );
    }, [data]) || [];

  return {
    error,
    isLoading,
    turns,
    operations,
    travels
  };
}
