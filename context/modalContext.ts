import { Dispatch, SetStateAction, createContext } from 'react';
import { Action } from '../interfaces';

type ModalContextData = {
  isOpen: boolean;
  onOpen(): void;
  onOpenChange: (isOpen: boolean) => void;
  handleAction: (action: Action) => void;
  handleClose(): void;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  action: Action;
};

const ModalContext = createContext({} as ModalContextData);

export default ModalContext;
