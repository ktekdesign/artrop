import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import OperationContext, { OperationData } from "./operationContext";
import { API_TURN_URL } from "../utils/constants";
import { hasOpen } from "../utils/api-action";
import { useQuery } from 'react-query';

export default function OperationContextProvider ({ children } : {
  children: ReactNode;
}) {
  const url = `${API_TURN_URL}open`
  const fetchData = () => hasOpen<OperationData>({url});
  
  const {data: operation} = useQuery([url], fetchData);
  
  return <OperationContext.Provider value={operation || {}}>
    {children}
  </OperationContext.Provider>;
};
