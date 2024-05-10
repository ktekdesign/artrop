import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../utils/api';
import { API_REPORTS_URL, statuses } from '../utils/constants';
import { Reports } from '../interfaces';
import { DateValue, RangeValue } from '@nextui-org/react';

const useReports = (
  interval: string | number,
  custom: RangeValue<DateValue>
) => {
  const url = API_REPORTS_URL;
  const fetchData = () =>
    getDashboard<Reports>({
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
