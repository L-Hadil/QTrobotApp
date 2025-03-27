// /app/ce1/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function CE1Page() {
  const [currentExpression, setCurrentExpression] = useState("neutral");

  const exercises = [
    { id: 1, title: "Addition", link: "/ce1/addition" },
    { id: 2, title: "Soustraction", link: "/ce1/soustraction" },
    { id: 3, title: "Mesures", link: "/ce1/mesures" },
    { id: 4, title: "Géométrie", link: "/ce1/geometrie" },
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

      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Exercices de CE1</h1>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}>
        {exercises.map((exercise) => (
          <Link 
            key={exercise.id} 
            href={exercise.link} 
            className="button" 
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#FF9800", 
              color: "white", 
              borderRadius: "5px",
              fontSize: "1.2rem"
            }}
          >
            {exercise.title}
          </Link>
        ))}
      </div>
    </div>
  );
}