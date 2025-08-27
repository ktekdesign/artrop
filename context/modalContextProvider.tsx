import {
  ReactNode,
  useState,
} from "react";

import { useDisclosure } from "@heroui/react";
import { Action } from "../interfaces";
import ModalContext from "./modalContext";

export default function ModalContextProvider ({ children } : {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [action, setAction] = useState({} as Action);
  const handleAction = (newAction: Action) => setAction(newAction);
  const handleClose = () => {
    onClose();
  }
  const value = {
    isOpen, onOpen, onOpenChange, handleAction, action, handleClose
  };
  
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
