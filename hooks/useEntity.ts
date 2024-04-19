import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getRecord } from '../utils/api';
import { pk } from '../interfaces';
import useModal from './useModal';

export default function useEntity<T extends pk>({
  url,
  id
}: {
  url?: string;
  id?: string;
}): { entity: T; setEntity: Dispatch<SetStateAction<T>> } {
  const [entity, setEntity] = useState({} as T);

  useEffect(() => {
    (async () => {
      if (id && url) {
        setEntity(await getRecord({ url, id }));
      } else {
        setEntity({} as T);
      }
    })();
  }, [id, url]);
  return { entity, setEntity };
}
