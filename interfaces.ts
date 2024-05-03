import { Operation, OperationType, Status, Travel, Turn } from '@prisma/client';

export interface pk {
  id?: string;
  message?: string;
  name?: string;
}

export interface Action extends pk {
  operation?: string;
}
export interface Address {
  code?: string;
  address?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
}
export interface PairKeyLabel {
  id: string;
  label: string;
}
export interface OperationInterf extends Operation {
  travel?: Travel[] | undefined;
}
export interface TurnData extends Turn {
  operation: OperationData;
}
export interface OperationData {
  type?: OperationType;
  operationId?: string;
  operationStartedAt?: Date;
  travel?: Travel;
  id?: string;
  status?: Status;
  startedAt?: Date;
}
export interface success {
  isSuccess?: boolean;
}
export const initialOperationData = {} as TurnData;

export interface Navigation {
  name: string;
  href: string;
}
