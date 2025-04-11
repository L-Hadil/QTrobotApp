"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { useSpeech } from "@/app/hooks/useSpeech";

export default function LevelSelection() {
  const [currentExpression, setCurrentExpression] = useState<
    "afraid" | "angry" | "confused" | "cry" | "disgusted" | 
    "happy" | "kiss" | "neutral" | "sad" | "scream" | 
    "talking" | "yawn"
  >("neutral");

  const { speak } = useSpeech();

  useEffect(() => {
    const prenom = localStorage.getItem("prenom") || "mon ami";
    const message = `Bonjour ${prenom} ! Je suis QTrobot, ton compagnon d'apprentissage rigolo et motivé ! Prêt pour une super aventure mathématique ? Choisis ton niveau pour commencer.`;

    speak(
      message,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, []);

  // Function to handle level selection and store it in localStorage
  const handleLevelSelection = (niveau: "CP" | "CE1") => {
    localStorage.setItem("niveau", niveau); // Save selected level
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      padding: "20px",
    }}>
      <div style={{ marginBottom: "2rem" }}>
        <QTRobot expression={currentExpression} />
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#10b981" }}>Choisis ton niveau</h1>
      <div style={{
        display: "flex",
        gap: "20px",
      }}>
        <Link 
          href="/cp" 
          className="button" 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            borderRadius: "5px",
            fontSize: "1.2rem"
          }}
          onClick={() => handleLevelSelection("CP")} // Store CP when clicked
        >
          CP
        </Link>
        <Link 
          href="/ce1" 
          className="button" 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#2196F3", 
            color: "white", 
            borderRadius: "5px",
            fontSize: "1.2rem"
          }}
          onClick={() => handleLevelSelection("CE1")} // Store CE1 when clicked
        >
          CE1
        </Link>
      </div>
    </div>
  );
}