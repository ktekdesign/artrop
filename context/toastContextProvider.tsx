import {
  ReactNode
} from "react";

import ToastContext from "./toastContext";
import { toast } from "react-toastify";

export default function ToastContextProvider ({ children } : {
  children: ReactNode;
}) {
  const handleToast = (message?: string) => !!message ? toast(message) : undefined
  
  const value = {
    handleToast
  };
  
  return <ToastContext.Provider value={value}>
    {children}
  </ToastContext.Provider>;
};
