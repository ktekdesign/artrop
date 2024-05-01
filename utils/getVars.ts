import { OperationData, TurnData } from '../interfaces';

export const getVars = (operations: TurnData['operation']): OperationData => {
  const {
    type,
    travel,
    id: operationId,
    startedAt: operationStartedAt
  } = operations?.shift() || {};
  const { id, status, startedAt } = travel?.shift() || {};
  return {
    type,
    operationId,
    operationStartedAt,
    id,
    status,
    startedAt
  };
};
