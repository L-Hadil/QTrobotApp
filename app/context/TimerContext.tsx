// app/context/TimerContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext<{
  minutes: number;
  seconds: number;
  resetTimer: () => void;
} | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsPassed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetTimer = () => setSecondsPassed(0);

  return (
    <TimerContext.Provider
      value={{
        minutes: Math.floor(secondsPassed / 60),
        seconds: secondsPassed % 60,
        resetTimer,
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
