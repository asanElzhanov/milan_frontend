import type { Metadata } from 'next';

import { Providers } from './providers';
import { ScrollReset } from './scroll-reset';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Sara Milan',
    template: '%s',
  },
  description: 'Sara Milan',
  openGraph: {
    siteName: 'Sara Milan',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full antialiased">
        <ScrollReset />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
