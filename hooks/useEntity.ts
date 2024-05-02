import { getRecord } from '../utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import submit from '../utils/submit';
import useModal from './useModal';
import { useState } from 'react';
import { pk } from '../interfaces';
import { toast } from 'react-toastify';

export default function useEntity<T, K>({ url }: { url?: string }) {
  const { action, handleClose } = useModal();
  const { id, operation } = action;
  const queryClient = useQueryClient();
  const endpoint = [url || '', id || ''];
  const [selected, setSelected] = useState<string | number>(0);

  const saveMutation = useMutation({
    mutationFn: async (data: K & pk) =>
      submit({
        url,
        data,
        action
      }),
    onSuccess: ({ message, ...data }: T & pk) => {
      if (operation !== 'update') handleClose();
      toast(message);
      queryClient.setQueryData([url, data.id], data);
    },
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: [url] }),
    onError: (err: Error) => toast(err.message)
  });

  const onSubmit = (data: K & pk) => saveMutation.mutate(data);

  const fetchData = () =>
    id && url ? getRecord<T>(endpoint.join('')) : undefined;

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: endpoint,
    queryFn: fetchData
  });

  return {
    entity: data,
    isError,
    isSuccess,
    isLoading,
    isHandlingMutation: saveMutation.isPending,
    operation,
    selected,
    setSelected,
    onSubmit
  };
}
