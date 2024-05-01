import { useMutation, useQueryClient } from '@tanstack/react-query';
import submit from '../utils/submit';
import useToast from '../hooks/useToast';
import { pk } from '../interfaces';
import { API_TURN_URL } from '../utils/constants';
import useModal from './useModal';

export default function useSaveMutation<T, K>(
  url: string,
  callback?: (data?: Omit<T & pk, 'message'>) => void | string
) {
  const { handleToast } = useToast();
  const queryClient = useQueryClient();
  const { action } = useModal();
  const saveMutation = useMutation({
    mutationFn: async (data: K) =>
      submit({
        url,
        data,
        action
      }),
    onSuccess: ({ message, ...data }: T & pk) => {
      if (callback) {
        const toast = callback(data);
        if (typeof toast === 'string') handleToast(toast);
      }
      queryClient.invalidateQueries({
        queryKey: [API_TURN_URL, 'open']
      });
      handleToast(message);
    },
    onError: (err: Error) => handleToast(err.message)
  });
  const onSubmit = (data: K) => saveMutation.mutate(data);
  return { isHandlingMutation: saveMutation.isPending, onSubmit };
}
