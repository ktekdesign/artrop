import { getRecords } from '../utils/api';
import { useQuery } from 'react-query';

export default function useEntities<T>(url: string) {
  const fetchPosts = () => getRecords<T>({ url });

  const {
    data: entities,
    error,
    isLoading: isLoadingEntity
  } = useQuery([url], fetchPosts);

  return { entities, error, isLoadingEntity };
}
