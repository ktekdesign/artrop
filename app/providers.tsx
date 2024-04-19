"use client";

import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from "@nextui-org/react";
import ModalContextProvider from "../context/modalContextProvider";
import ToastContextProvider from "../context/toastContextProvider";
import OperationContextProvider from "../context/operationContextProvider";

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => (
  <SessionProvider>
    <NextUIProvider>
      <ModalContextProvider>
        <ToastContextProvider>
          <OperationContextProvider>
          {children}
          </OperationContextProvider>
        </ToastContextProvider>
      </ModalContextProvider>
    </NextUIProvider>
  </SessionProvider>
)
 export default AppProvider