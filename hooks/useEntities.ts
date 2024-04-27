import { getRecords } from '../utils/api';
import { useQuery } from 'react-query';

export default function useEntities<T>(url: string) {
  const fetchData = () => getRecords<T>({ url });

  const { data, isError, isLoading } = useQuery([url], fetchData);

  return { entities: data, isError, isLoading };
}
