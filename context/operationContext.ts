import { createContext } from 'react';
import { TurnData, initialOperationData, success } from '../interfaces';

const OperationContext = createContext<TurnData & success>(
  initialOperationData
);

export default OperationContext;
