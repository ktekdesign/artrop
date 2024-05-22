import {
  Operation,
  OperationType,
  Status,
  Travel,
  Turn,
  User,
  Vehicle,
  VehiclesTurn
} from '@prisma/client';

export interface pk {
  id?: string;
  message?: string;
  name?: string;
  actions?: string;
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
  vehiclesTurn: VehiclesTurnData[];
}
export interface VehiclesTurnData extends VehiclesTurn {
  vehicle: Vehicle[];
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

export interface NavigationBase {
  name?: string;
  href?: string;
}
export interface Navigation extends NavigationBase {
  items?: NavigationBase[];
}
export interface Reports extends User {
  turn: (Turn & { operation: (Operation & { travel: Travel[] })[] })[];
}
