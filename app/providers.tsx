"use client";

import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from "@nextui-org/react";
import ModalContextProvider from "../context/modalContextProvider";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => (
  <SessionProvider>
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          {children}
        </ModalContextProvider>
      </QueryClientProvider>
    </NextUIProvider>
  </SessionProvider>
)
 export default AppProvider