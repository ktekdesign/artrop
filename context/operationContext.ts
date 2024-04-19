import { OperationType, Status } from '@prisma/client';
import { Dispatch, SetStateAction, createContext } from 'react';

export type OperationData = {
  turnId?: string;
  id?: string;
  status?: string;
  type?: OperationType;
};
type OperationContextData = {
  operation: OperationData;
  setOperation: Dispatch<SetStateAction<OperationData>>;
};
const OperationContext = createContext({} as OperationContextData);

export default OperationContext;
