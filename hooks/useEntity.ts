import { getRecord } from '../utils/api';
import { useQuery, useMutation } from 'react-query';
import submit from '../utils/submit';
import useToast from './useToast';
import useModal from './useModal';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

export default function useEntity<T, K>({ url }: { url?: string }) {
  const { handleToast } = useToast();
  const {
    action: { id, operation },
    handleClose
  } = useModal();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<string | number>(0);

  const saveMutation = useMutation({
    mutationFn: async (data: K) => {
      const response = submit(handleToast, handleClose, {
        url,
        data,
        action: { id, operation }
      });
      await queryClient.invalidateQueries({
        queryKey: [url, id]
      });
      return response;
    }
  });

  const fetchPosts = () => getRecord<T>({ url, id });

  const { data: entity, error, isLoading } = useQuery([url, id], fetchPosts);

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
