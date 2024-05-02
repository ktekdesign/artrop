import { API_TURN_URL } from '../utils/constants';
import { TurnData, initialOperationData } from '../interfaces';
import { getRecord } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import preventUndefined from '../utils/prevent-undefined';

const useTurn = () => {
  const url = [API_TURN_URL, 'open'];
  const fetchData = () => getRecord<TurnData>(url.join(''));

  const { data, isPending } = useQuery({
    queryKey: url,
    queryFn: fetchData
  });

  return { isPending, ...preventUndefined(initialOperationData, data) };
};

export default useTurn;
