import { getRecord } from '../utils/api';
import { useQuery, useMutation } from 'react-query';
import submit from '../utils/submit';
import useToast from './useToast';
import useModal from './useModal';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { pk } from '../interfaces';

export default function useEntity<T, K>({ url }: { url?: string }) {
  const { handleToast } = useToast();
  const { action, handleClose } = useModal();
  const { id, operation } = action;
  const queryClient = useQueryClient();
  const endpoint = [url || '', id || ''];
  const [selected, setSelected] = useState<string | number>(0);

  const saveMutation = useMutation({
    mutationFn: async (data: K) =>
      submit({
        url,
        data,
        action
      }),
    onSuccess: ({ message, ...data }: T & pk) => {
      if (operation !== 'update') handleClose();
      handleToast(message);
      queryClient.setQueryData([url, data.id], data);
      queryClient.invalidateQueries({
        queryKey: [url]
      });
    },
    onError: (err: Error) => handleToast(err.message)
  });

  const onSubmit = (data: K) => saveMutation.mutate(data);

  const fetchData = () => (id && url ? getRecord<T>(endpoint) : undefined);

  const { data, isError, isSuccess, isLoading } = useQuery(endpoint, fetchData);

  return {
    entity: data,
    isError,
    isSuccess,
    isLoading,
    isHandlingMutation: saveMutation.isLoading,
    operation,
    selected,
    setSelected,
    onSubmit
  };
}
