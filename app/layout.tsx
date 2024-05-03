import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import AppProvider from './providers';
import { ToastContainer } from 'react-toastify';

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
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <AppProvider>
          <Nav />
          {children}
          <ToastContainer />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
