import {
  ReactNode
} from "react";

import OperationContext from "./operationContext";
import { API_TURN_URL } from "../utils/constants";
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getRecord } from "../utils/api";
import { TurnData, initialOperationData } from "../interfaces";
import preventUndefined from "../utils/prevent-undefined";

export default function OperationContextProvider ({ children } : {
  children: ReactNode;
}) {
  const url = [API_TURN_URL, 'open']
  const fetchData = () => getRecord(url.join(''));
  
  const {data} = useQuery({
    queryKey: url,
    queryFn: fetchData,
    gcTime: 0,
    refetchOnMount: true
  });
console.log(data)
  const value = preventUndefined(initialOperationData, data as TurnData)
  return <OperationContext.Provider value={value}>
    {children}
  </OperationContext.Provider>;
};
