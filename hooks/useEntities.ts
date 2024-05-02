import { useState } from 'react';
import { getRecords } from '../utils/api';
import { useQuery } from '@tanstack/react-query';

export default function useEntities<T>(url: string) {
  const fetchData = () => getRecords<T>({ url });
  const { data, isPending, isSuccess } = useQuery({
    queryKey: [url],
    queryFn: fetchData
  });
  const [entities, setEntities] = useState<T[] | undefined>();

  return {
    init: data,
    isPending,
    isSuccess,
    entities: entities || data,
    setEntities
  };
}
