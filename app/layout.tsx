import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import AppProvider from './providers';
import { ToastContainer } from 'react-toastify';
import { getServerSession } from "next-auth/next"
import {authOptions} from "./api/auth/[...nextauth]/route"

export const metadata = {
  title: 'Artrop Sistema',
  description:
    'Sistema de gerenciamento das Operações Portuárias'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <AppProvider>
          <Nav user={session?.user} />
          {children}
          <ToastContainer />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
