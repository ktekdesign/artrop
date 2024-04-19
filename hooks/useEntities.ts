import { useEffect, useState } from 'react';
import { getRecords } from '../utils/api';
import useModal from './useModal';

export default function useEntities<T>(url: string): T {
  const [entities, setEntities] = useState([] as T);
  const { refresh } = useModal();
  useEffect(() => {
    (async () => setEntities(await getRecords({ url })))();
  }, [refresh, url]);
  return entities;
}
