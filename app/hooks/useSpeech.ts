"use client";

import { useEffect, useState } from "react";

export const useSpeech = () => {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const speak = (
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "fr-FR";
    utterance.rate = 1.0;
    utterance.pitch = 1.2;
    utterance.volume = 1.0;

    const voice = availableVoices.find((v) =>
      v.lang === "fr-FR" &&
      (
        v.name.toLowerCase().includes("google") ||
        v.name.toLowerCase().includes("audrey") ||
        v.name.toLowerCase().includes("amelie")
      )
    );

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    synth.cancel();
    synth.speak(utterance);
  };

  return { speak, availableVoices };
};
