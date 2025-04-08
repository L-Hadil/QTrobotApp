"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import QTRobot from "@/app/components/QTRobot";
import type { QTRobotExpression } from "@/app/components/QTRobot";
import { useSpeech } from "@/app/hooks/useSpeech";

export default function CPPage() {
  const [currentExpression, setCurrentExpression] = useState<QTRobotExpression>("neutral");
  const { speak } = useSpeech();

  useEffect(() => {
    speak(
      "Bienvenue dans les exercices de CE1 ! Choisis une activité pour apprendre en t’amusant.",
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, []);

  const exercises = [
    { id: 1, title: "Multiplication", link: "/ce1/multiplication", image: "/images/multiplication.jpg" },
    { id: 2, title: "Soustraction", link: "/ce1/soustraction", image: "/images/soustraction.jpg"},
    { id: 3, title: "Unités de mesures", link: "/ce1/mesures", image: "/images/mesures.jpg" },
    { id: 4, title: "Géométrie", link: "/ce1/geometrie", image: "/images/geometrie.jpg" },
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

      <h1 style={{ fontSize: "2rem", color: "#10b981", marginBottom: "1rem" }}>
        Exercices de CE1
      </h1>

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
