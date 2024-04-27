import { TurnData } from '../interfaces';

export const getVars = (operations: TurnData['operation']) => {
  const {
    type,
    travel,
    id: operationId,
    startedAt: operationStartedAt
  } = operations?.shift() || {};
  const { id, status, weight } = travel?.shift() || {};
  return { type, operationId, operationStartedAt, travel, id, status, weight };
};
