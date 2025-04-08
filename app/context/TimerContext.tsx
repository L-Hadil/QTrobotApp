"use client";

import { createContext, useContext, useEffect, useState } from "react";

type TimerContextType = {
  minutes: number;
  seconds: number;
  resetTimer: () => void;
  stopTimer: () => void;
};

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setSecondsPassed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => {
    setSecondsPassed(0);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{
        minutes: Math.floor(secondsPassed / 60),
        seconds: secondsPassed % 60,
        resetTimer,
        stopTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useGlobalTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useGlobalTimer must be used inside TimerProvider");
  return context;
};
