import { Operation, Travel, Turn } from '@prisma/client';

export interface pk {
  id?: string;
  message?: string;
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

export interface TurnData extends Turn {
  operation: (Operation & { travel: Travel[] })[];
}
export interface success {
  isSuccess?: boolean;
}
export const initialOperationData = {} as TurnData;
