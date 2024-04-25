import { getRecord } from '../utils/api';
import { useQuery, useMutation } from 'react-query';
import submit from '../utils/submit';
import useToast from './useToast';
import useModal from './useModal';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { pk } from '../interfaces';
import { API_TURN_URL } from '../utils/constants';

export default function useEntity<T extends pk, K>({ url }: { url?: string }) {
  const { handleToast } = useToast();
  const {
    action: { id, operation },
    handleClose
  } = useModal();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<string | number>(0);

  const saveMutation = useMutation({
    mutationFn: async (data: K) => {
      return submit(handleToast, handleClose, {
        url,
        data,
        action: { id, operation }
      });
    },
    onSuccess: (data: T) => {
      queryClient.setQueryData([url, data.id], data);
      queryClient.invalidateQueries({
        queryKey: [url]
      });
      queryClient.invalidateQueries({
        queryKey: [API_TURN_URL]
      });
    }
  });

  const fetchData = () => getRecord<T>({ url, id });

  const { data: entity, error, isLoading } = useQuery([url, id], fetchData);

  return {
    entity,
    error,
    isLoading,
    saveMutation,
    operation,
    selected,
    setSelected
  };
}
