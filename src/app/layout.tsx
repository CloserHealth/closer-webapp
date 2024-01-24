"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from './components/redux/provider'
import { Toaster } from 'react-hot-toast';
import DesktopPreviewMessage from './components/DesktopPreview/DesktopPreview';
import { BsFillChatHeartFill } from "react-icons/bs";
import { goToLinkNewTab } from '@/helpers';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Closer',
//   description: 'Get closer to your best self',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <Toaster />
        <ReduxProvider>
          {/* {isDesktopView && <DesktopPreviewMessage />} */}
          {children}
          <button onClick={() => goToLinkNewTab('https://docs.google.com/forms/d/e/1FAIpQLScL9EtQ-gkw7pZrsXvN7RBM31i0BjXLatqLipyhNhwWW-7OWQ/viewform?usp=sf_link')} className="bg-[#000] text-white text-[13px] px-3 py-2 rounded-full absolute bottom-2 right-2 flex items-center space-x-2">
            <BsFillChatHeartFill style={{ color: "#fff", fontSize: "20px" }} />
            <span>Feedback</span>
          </button>
        </ReduxProvider>
      </body>
    </html>
  )
}
