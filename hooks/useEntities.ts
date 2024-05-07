import { useMemo, useState } from 'react';
import { getRecords } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { PairKeyLabel, pk } from '../interfaces';
import pickObjectKeys from '../utils/pickKeys';

export default function useEntities<T extends pk>(
  url: string,
  titles?: string[],
  fields?: (keyof T)[]
) {
  const fetchData = () => getRecords<T>({ url });
  const { data, isPending, isSuccess } = useQuery({
    queryKey: [url],
    queryFn: fetchData
  });
  const [entities, setEntities] = useState<T[] | undefined>();

  const { current, ...props } = useMemo(() => {
    const current = entities || data;
    if (fields && titles) {
      const columns: PairKeyLabel[] | undefined = titles.map((title, key) => ({
        id: fields[key].toString(),
        label: title
      }));
      columns.push({ id: 'actions', label: 'Ações' });
      const rows = current
        ?.map((entity) => pickObjectKeys(entity, fields))
        .map((row) => ({ ...row, actions: '' }));
      return { current, columns, rows };
    }
    return { current };
  }, [data, entities]);
  return {
    entities: data,
    isPending,
    isSuccess,
    setEntities,
    ...props
  };
}
