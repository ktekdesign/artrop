import { OperationType, Status } from '@prisma/client';
import { createContext } from 'react';

export type OperationData = {
  id: string;
  startedAt: Date;
  endedAt: Date | null;
  status: boolean;
  operation?: {
    id: string;
    status: boolean;
    type: OperationType;
    startedAt: Date;
    endedAt: Date | null;
    travel?: {
      id: string;
      status: Status;
      weight: number | null;
      startedAt: Date;
      endedAt: Date | null;
    };
  };
};
const OperationContext = createContext<OperationData | undefined>(undefined);

export default OperationContext;
