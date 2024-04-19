import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import OperationContext, { OperationData } from "./operationContext";
import { API_TURN_URL } from "../utils/constants";
import { hasOperationOpen } from "../utils/api-action";

export default function OperationContextProvider ({ children } : {
  children: ReactNode;
}) {
  const [operation, setOperation] = useState({} as OperationData)
  
  useEffect(() => {
    (async () => setOperation(await hasOperationOpen({url: API_TURN_URL})))()
  }, [])
  const value = {operation, setOperation};
  
  return <OperationContext.Provider value={value}>
    {children}
  </OperationContext.Provider>;
};
