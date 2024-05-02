import { getRecords } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { API_DASHBOARD_OPERATION_URL } from '../utils/constants';
import { useMemo } from 'react';
interface DashboardData {
  type: string;
  _count: {
    type: number;
  };
}
export default function useDashboardOperation() {
  const url = API_DASHBOARD_OPERATION_URL;
  const fetchData = () => getRecords<DashboardData>({ url });

  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: fetchData
  });
  const types = useMemo(
    () =>
      data?.map(({ type, _count }) => ({
        name: type,
        value: _count.type
      })),
    [data]
  );

  return {
    error,
    isLoading,
    types
  };
}
