"use client";

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
  <NextUIProvider>
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        {children}
      </ModalContextProvider>
    </QueryClientProvider>
  </NextUIProvider>
)
 export default AppProvider