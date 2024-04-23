"use client";

import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from "@nextui-org/react";
import ModalContextProvider from "../context/modalContextProvider";
import ToastContextProvider from "../context/toastContextProvider";
import OperationContextProvider from "../context/operationContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => (
  <SessionProvider>
    <NextUIProvider>
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        <ToastContextProvider>
          <OperationContextProvider>
          {children}
          </OperationContextProvider>
        </ToastContextProvider>
      </ModalContextProvider>
      </QueryClientProvider>
    </NextUIProvider>
  </SessionProvider>
)
 export default AppProvider