import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter, Noto_Sans_SC } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ysnotebook',
  description: 'Collaborative documentation platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans`}>{children}</body>
    </html>
  );
}
