import { OperationType, Status, Travel } from '@prisma/client';
import { minutesDiff } from '../utils/transform';
import { useCallback, useMemo } from 'react';
import useSaveMutation from './useSaveMutation';
import { API_TRAVEL_URL, API_TURN_URL } from '../utils/constants';
import { OperationData, TurnData, initialOperationData } from '../interfaces';
import { Weight } from '../forms/weight';
import { getRecord } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import preventUndefined from '../utils/prevent-undefined';

const useTurn = () => {
  const url = [API_TURN_URL, 'open'];
  const fetchData = () => getRecord(url.join(''));

  const { data } = useQuery({
    queryKey: url,
    queryFn: fetchData,
    gcTime: 0,
    refetchOnMount: true
  });
  console.log(data);
  return preventUndefined(initialOperationData, data as TurnData);
};

export default useTurn;
