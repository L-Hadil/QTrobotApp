"use client";

import Link from "next/link";
import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function AdditionDifficultySelection() {
  const [currentExpression, setCurrentExpression] = useState("neutral");

  const difficulties = [
    { id: 1, title: "Facile", link: "/ce1/soustraction/facile" },
    { id: 2, title: "Moyen", link: "/ce1/soustraction/moyen" },
    { id: 3, title: "Difficile", link: "/ce1/soustraction/difficile" },
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

      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#10b981" }}>Choisis la difficulté pour les soustractions</h1>
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