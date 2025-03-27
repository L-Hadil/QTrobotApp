// /app/cp/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function CPPage() {
  const [currentExpression, setCurrentExpression] = useState("neutral");

  const exercises = [
    { id: 1, title: "Addition", link: "/cp/addition", image: "/images/addition.jpg" },
    { id: 2, title: "Soustraction", link: "/cp/soustraction", image: "/images/soustraction.jpg" },
    { id: 3, title: "Mesures", link: "/cp/mesures", image: "/images/mesures.jpg" },
    { id: 4, title: "Géométrie", link: "/cp/geometrie", image: "/images/geometrie.jpg" },
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

      <h1 style={{ fontSize: "2rem", color: "#10b981", marginBottom: "1rem" }}>Exercices de CP</h1>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        {exercises.map((exercise) => (
            <Link key={exercise.id} href={exercise.link} className="button">
                <img src={exercise.image} alt={exercise.title} style={{ width: "50px", marginBottom: "10px" }} />
                <span style={{ marginLeft: "10px" }}>{exercise.title}</span>
            </Link>
        ))}
      </div>
    </div>
  );
}