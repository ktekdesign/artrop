"use client";

import { SessionProvider } from "next-auth/react";
import {HeroUIProvider} from '@heroui/react'
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
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          {children}
        </ModalContextProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  </SessionProvider>
)
 export default AppProvider