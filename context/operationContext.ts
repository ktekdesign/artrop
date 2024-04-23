import { OperationType, Status } from '@prisma/client';
import { Dispatch, SetStateAction, createContext } from 'react';

export type OperationData = {
  turnId?: string;
  id?: string;
  status?: string;
  type?: OperationType;
  travel?: {
    id: string;
    status: Status;
    weight?: number;
  };
};
const OperationContext = createContext({} as OperationData);

export default OperationContext;
