'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from './components/redux/provider'
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import DesktopPreviewMessage from './components/DesktopPreview/DesktopPreview';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Closer',
//   description: '',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      // Check the viewport width and update the state
      setIsDesktopView(window.innerWidth >= 500);
    };

    // Add an event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <Toaster />
        <ReduxProvider>
          {isDesktopView && <DesktopPreviewMessage />}
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
