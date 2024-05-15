import { useMutation, useQueryClient } from '@tanstack/react-query';
import submit from '../utils/submit';
import { pk } from '../interfaces';
import { API_TURN_URL } from '../utils/constants';
import useModal from './useModal';
import { toast } from 'react-toastify';

export default function useSaveMutation<T, K>(
  url: string,
  callback?: (data?: Omit<T & pk, 'message'>) => void | string
) {
  const queryClient = useQueryClient();
  const { action } = useModal();
  const saveMutation = useMutation({
    mutationFn: async (data: K & pk) =>
      submit({
        url,
        data,
        action:
          data.id && !action.operation
            ? { id: data.id, operation: 'update' }
            : action
      }),
    onSuccess: ({ message, ...data }: T & pk) => {
      if (callback) {
        const info = callback(data);
        if (typeof info === 'string') toast(info);
      }
      toast(message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [API_TURN_URL, 'open'] });
      await queryClient.invalidateQueries({ queryKey: ['current-turn'] });
    },
    onError: (err: Error) => toast(err.message)
  });
  const onSubmit = (data: K & pk) => saveMutation.mutate(data);
  return { isHandlingMutation: saveMutation.isPending, onSubmit };
}
