import { useCallback, useMemo, useState } from 'react';
import { getRecords } from '../utils/api';
import { useQuery } from '@tanstack/react-query';

export default function useEntities<T>(url: string) {
  const fetchData = () => getRecords<T>({ url });
  const { data, isPending, isSuccess } = useQuery({
    queryKey: [url],
    queryFn: fetchData
  });
  const [entities, setEntities] = useState<T[] | undefined>();
  const current = useMemo(() => entities || data, [data, entities]);
  return {
    init: data,
    isPending,
    isSuccess,
    entities: current,
    setEntities
  };
}
