import { API_TURN_URL } from '../utils/constants';
import { TurnData, initialOperationData } from '../interfaces';
import { getRecord } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import preventFalsy from '../utils/prevent-falsy';

const useTurn = () => {
  const url = [API_TURN_URL, 'open'];
  const fetchData = () => getRecord<TurnData>(url.join(''));

  const { data, isSuccess } = useQuery<TurnData>({
    queryKey: url,
    queryFn: fetchData
  });
  const turn = preventFalsy<TurnData>(data, initialOperationData);
  return { isSuccess, ...turn };
};

export default useTurn;
