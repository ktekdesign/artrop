import { getDashboard } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { API_DASHBOARD_OPERATION_URL } from '../utils/constants';
import { useMemo, useState } from 'react';
import { DateValue, RangeValue } from '@nextui-org/react';
import { getLocalTimeZone } from '@internationalized/date';
interface DashboardData {
  type: string;
  _count: {
    type: number;
  };
}
export default function useDashboardOperation(
  interval: string | number,
  custom: RangeValue<DateValue>
) {
  const url = API_DASHBOARD_OPERATION_URL;
  const fetchData = () =>
    getDashboard<DashboardData>({
      url,
      body: {
        interval,
        end: custom.end.toDate(getLocalTimeZone()),
        start: custom.start.toDate(getLocalTimeZone())
      }
    });

  const { data, error, isLoading } = useQuery({
    queryKey: [url, interval, custom.end.toString(), custom.start.toString()],
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
