'use client';

import useGlobalState from '@/hooks/globalstate.hook';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { FadeIn } from './components/Transitions/Transitions';

export default function Home() {
  const navigate = useRouter();
  const { isAuthenticated } = useGlobalState();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isAuthenticated ? navigate.replace('/landing-page') : navigate.replace('/login');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <FadeIn>
      <SplashScreen />
    </FadeIn>
  );
}