import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Akrobat Pte Ltd | Fall Arrest & Height Safety Specialist',
    template: '%s | Akrobat',
  },
  description:
    'Founded in 2005, Akrobat is a leading fall arrest and fall prevention brand in Singapore, with height safety systems installed at more than 600 sites.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
