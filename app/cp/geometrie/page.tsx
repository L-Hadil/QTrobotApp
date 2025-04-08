"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import QTRobot from "@/app/components/QTRobot";
import type { QTRobotExpression } from "@/app/components/QTRobot";
import { useSpeech } from "@/app/hooks/useSpeech";

export default function AdditionDifficultySelection() {
  const [currentExpression, setCurrentExpression] = useState<QTRobotExpression>("neutral");
  const { speak } = useSpeech();

  useEffect(() => {
    speak(
      "Bienvenue les champions et les championnes ! Choisis ton niveau préféré pour commencer.",
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, []);

  const difficulties = [
    { id: 1, title: "Facile", link: "/cp/geometrie/facile" },
    { id: 2, title: "Moyen", link: "/cp/geometrie/moyen" },
    { id: 3, title: "Difficile", link: "/cp/geometrie/difficile" },
  ];

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

      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#10b981" }}>Choisis la difficulté</h1>
      
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}>
        {difficulties.map((difficulty) => (
          <Link 
            key={difficulty.id} 
            href={difficulty.link}
            className="button" 
            style={{ 
              padding: "15px 30px",
              backgroundColor: "#9C27B0",
              color: "white",
              borderRadius: "8px",
              fontSize: "1.2rem",
              textAlign: "center",
              transition: "transform 0.2s"
            }}
            onMouseEnter={() => setCurrentExpression("happy")}
            onMouseLeave={() => setCurrentExpression("neutral")}
          >
            {difficulty.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
