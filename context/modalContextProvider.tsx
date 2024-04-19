import {
  ReactNode,
  useState,
} from "react";

import { useDisclosure } from "@nextui-org/react";
import { Action } from "../interfaces";
import ModalContext from "./modalContext";

export default function ModalContextProvider ({ children } : {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [action, setAction] = useState({} as Action);
  const [refresh, setRefresh] = useState(false);
  const handleAction = (newAction: Action) => setAction(newAction);
  const handleClose = () => {
    onClose();
    setRefresh(!refresh)
  }
  const value = {
    isOpen, onOpen, onOpenChange, handleAction, action, handleClose, refresh, setRefresh
  };
  
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
