import {
  ReactNode
} from "react";

import OperationContext from "./operationContext";
import { API_TURN_URL } from "../utils/constants";
import { useQuery } from 'react-query';
import { getRecord } from "../utils/api";
import { TurnData, initialOperationData } from "../interfaces";
import preventUndefined from "../utils/prevent-undefined";

export default function OperationContextProvider ({ children } : {
  children: ReactNode;
}) {
  const url = [API_TURN_URL, 'open']
  const fetchData = () => getRecord<TurnData>(url);
  
  const {data, isSuccess} = useQuery(url, fetchData);

  const value = {isSuccess, ...preventUndefined(initialOperationData, data)}
  return <OperationContext.Provider value={value}>
    {children}
  </OperationContext.Provider>;
};
