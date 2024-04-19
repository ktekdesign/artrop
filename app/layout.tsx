import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import AppProvider from './providers';
import TurnButton from './turn-button';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
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
          <Suspense>
            <Nav />
          </Suspense>
          {children}
          <TurnButton />
          <ToastContainer />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
