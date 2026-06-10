import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Sara Milan',
  description: 'Premium fashion e-commerce store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
