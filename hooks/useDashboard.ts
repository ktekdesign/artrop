import { getRecords } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { PieData } from '../app/pie-chart-dashboard';
import { API_DASHBOARD_URL } from '../utils/constants';
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
  const turns: PieData[] = [];
  const operations: PieData[] = [];
  const travels: PieData[] = [];

  data?.map(({ name, _count }) => {
    turns.push({ name, value: _count.turn });
    operations.push({ name, value: _count.operation });
    travels.push({ name, value: _count.travel });
  });

  return {
    error,
    isLoading,
    turns,
    operations,
    travels
  };
}
