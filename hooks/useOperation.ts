import OperationContext from '../context/operationContext';
import { useContext } from 'react';

export default function useOperation() {
  return useContext(OperationContext);
}
