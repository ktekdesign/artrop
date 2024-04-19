import {
  ReactNode,
  useState,
} from "react";

import ToastContext from "./toastContext";
import { toast } from "react-toastify";

export default function ToastContextProvider ({ children } : {
  children: ReactNode;
}) {
  const handleToast = (message?: string) => {
    if(!!message) return toast(message)
  }
  
  const value = {
    handleToast
  };
  
  return <ToastContext.Provider value={value}>
    {children}
  </ToastContext.Provider>;
};
