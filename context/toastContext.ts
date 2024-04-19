import { createContext } from 'react';
import { Action } from '../interfaces';

type ToastContextData = {
  handleToast: (toast?: string) => void;
};

const ToastContext = createContext({} as ToastContextData);

export default ToastContext;
