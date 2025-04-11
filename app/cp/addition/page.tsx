"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { useSpeech } from "@/app/hooks/useSpeech";
import { useRouter } from "next/navigation";
import type { QTRobotExpression } from "@/app/components/QTRobot";

export default function AdditionDifficultySelection() {
  const [currentExpression, setCurrentExpression] = useState<QTRobotExpression>("neutral");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const { speak } = useSpeech();
  const router = useRouter();

  // Load child data from localStorage
  useEffect(() => {
    const name = localStorage.getItem("prenom") || "Anonyme";
    const age = localStorage.getItem("age") || "Inconnu";
    setChildName(name);
    setChildAge(age);
    
    speak(
      `${name}, choisis ton niveau préféré pour t'amuser avec les additions !`,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, []);

  const handleDifficultySelect = (level: string) => {
    setCurrentExpression("happy");
    setTimeout(() => {
      router.push(`/cp/addition/${level}`);
    }, 500);
  };

  const difficulties = [
    { 
      id: 1, 
      title: "Facile", 
      level: "facile", 
      color: "#3b82f6",
      description: "Nombres de 0 à 5",
      emoji: "😊"
    },
    { 
      id: 2, 
      title: "Moyen", 
      level: "moyen", 
      color: "#f59e0b",
      description: "Nombres de 0 à 10",
      emoji: "😃"
    },
    { 
      id: 3, 
      title: "Difficile", 
      level: "difficile", 
      color: "#ef4444",
      description: "Nombres de 0 à 20",
      emoji: "🧠"
    },
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
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      backgroundColor: "#f8fafc"
    }}>
      {/* Child info display */}
      <div style={{
        position: "absolute",
        top: "10px",
        left: "20px",
        fontSize: "1rem",
        color: "#555",
        background: "rgba(255,255,255,0.8)",
        padding: "6px 12px",
        borderRadius: "8px"
      }}>
        {childName} ({childAge} ans)
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <QTRobot expression={currentExpression} />
      </div>

      <h1 style={{ 
        fontSize: "2rem", 
        marginBottom: "1rem", 
        color: "#10b981",
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
      }}>
        Choisis la difficulté pour les additions
      </h1>

      <p style={{ 
        fontSize: "1.2rem", 
        marginBottom: "2rem",
        color: "#64748b"
      }}>
        Sélectionne le niveau qui te convient le mieux !
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "800px",
        padding: "0 20px"
      }}>
        {difficulties.map((difficulty) => (
          <div
            key={difficulty.id}
            onClick={() => handleDifficultySelect(difficulty.level)}
            style={{ 
              padding: "25px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              borderTop: `5px solid ${difficulty.color}`,
              textAlign: "center",
              
            }}
            onMouseEnter={() => setCurrentExpression("happy")}
            onMouseLeave={() => setCurrentExpression("neutral")}
          >
            <div style={{ 
              fontSize: "2rem",
              marginBottom: "10px"
            }}>
              {difficulty.emoji}
            </div>
            <h2 style={{ 
              fontSize: "1.5rem",
              marginBottom: "5px",
              color: difficulty.color
            }}>
              {difficulty.title}
            </h2>
            <p style={{ 
              fontSize: "1rem",
              color: "#64748b"
            }}>
              {difficulty.description}
            </p>
            <div style={{
              marginTop: "15px",
              padding: "8px 16px",
              backgroundColor: difficulty.color,
              color: "white",
              borderRadius: "20px",
              display: "inline-block",
              fontSize: "0.9rem"
            }}>
              Commencer
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: "3rem",
        fontSize: "0.9rem",
        color: "#94a3b8"
      }}>
        <p>Tu peux changer de niveau à tout moment</p>
      </div>
    </div>
  );
}