import { getRecords } from '../utils/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export default function useEntities<T>(
  url: string,
  options?:
    | Omit<UseQueryOptions<T[], unknown, T[], string[]>, 'queryKey' | 'queryFn'>
    | undefined
) {
  const fetchData = () => getRecords<T>({ url });

  const { data, isError, isLoading } = useQuery({
    queryKey: [url],
    queryFn: fetchData
  });

  return { entities: data, isError, isLoading };
}
