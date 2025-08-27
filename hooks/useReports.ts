import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../utils/api';
import { API_REPORTS_URL, statuses } from '../utils/constants';
import { Reports } from '../interfaces';
import { DateValue, RangeValue } from '@heroui/react';
import { getLocalTimeZone } from '@internationalized/date';
import { useSession } from 'next-auth/react';

const useReports = (
  interval: string | number,
  custom: RangeValue<DateValue>
) => {
  const url = API_REPORTS_URL;
  const session = useSession();
  const queryKey =
    session?.data?.user?.type === 'ADMIN'
      ? [url, interval, custom.end.toString(), custom.start.toString()]
      : ['current-turn'];
  const fetchData = () =>
    getDashboard<Reports>({
      url,
      body: {
        interval,
        end: custom.end.toDate(getLocalTimeZone()),
        start: custom.start.toDate(getLocalTimeZone())
      }
    });

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: fetchData
  });
  return {
    data,
    travelColumns: [
      ...statuses,
      {
        id: 'duration',
        report: 'Duração'
      }
    ],
    error,
    isLoading
  };
};

export default useReports;
