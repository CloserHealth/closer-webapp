import React, { useState, useEffect } from 'react';

function useCountdown(timeInSeconds: number): [string, boolean, (count: number) => any] {
  const [countdown, setCountdown] = useState(timeInSeconds);

  useEffect(() => {
    setCountdown(timeInSeconds);
  }, [timeInSeconds]);

  const [timer, setTimer] = useState<any>(null);
  const startTimer = () => {
    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    setTimer(interval);
  };

  const restartTimer = (count: number) => {
    clearInterval(timer);
    setCountdown(count);
    startTimer();
  };

  useEffect(() => {
    isDone && clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const isDone = minutes === 0 && seconds === 0;

  return [`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`, isDone, restartTimer];
}

export default useCountdown;
