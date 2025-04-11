"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import QTRobot from "@/app/components/QTRobot";
import type { QTRobotExpression } from "@/app/components/QTRobot";
import { useSpeech } from "@/app/hooks/useSpeech";
import { useGlobalTimer } from "@/app/context/TimerContext";

export default function CE1Page() {
  const [currentExpression, setCurrentExpression] = useState<QTRobotExpression>("neutral");
  const { speak } = useSpeech();
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState(""); // Add age state
  const { minutes, seconds } = useGlobalTimer();

  useEffect(() => {
    const storedPrenom = localStorage.getItem("prenom") || "";
    const storedAge = localStorage.getItem("age") || ""; // Get age from localStorage
    setPrenom(storedPrenom);
    setAge(storedAge);

    speak(
      `Bienvenue ${storedPrenom} dans les exercices de CE1 ! Choisis une activité pour apprendre en t’amusant.`,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, []);

  const exercises = [
    { id: 1, title: "Multiplication", link: "/ce1/multiplication", image: "/images/multiplication.jpg" },
    { id: 2, title: "Soustraction", link: "/ce1/soustraction", image: "/images/soustraction.jpg" },
    { id: 3, title: "Unités de mesures", link: "/ce1/mesures", image: "/images/mesures.jpg" },
    { id: 4, title: "Géométrie", link: "/ce1/geometrie", image: "/images/geometrie.jpg" },
  ];

  const handleExerciseSelection = (exerciseTitle: string) => {
    localStorage.setItem("ce1Exercise", exerciseTitle);
    localStorage.setItem("lastExerciseTime", new Date().toISOString());
    // Also store age with the exercise selection
    localStorage.setItem("exerciseAge", age); // Persist age with exercise
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
      <div style={{ 
        position: "absolute", 
        top: "10px", 
        right: "20px", 
        fontSize: "1rem", 
        color: "#555", 
        background: "rgba(255,255,255,0.8)", 
        padding: "6px 12px", 
        borderRadius: "8px" 
      }}>
        ⏱ Temps passé : {minutes} min {seconds < 10 ? `0${seconds}` : seconds}s
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <QTRobot expression={currentExpression} />
      </div>

      <h1 style={{ fontSize: "2rem", color: "#10b981", marginBottom: "1rem" }}>
        Exercices de CE1
      </h1>

      {/* Display child's age */}
      {age && (
        <p style={{ 
          fontSize: "1.2rem", 
          color: "#3b82f6",
          marginBottom: "1rem"
        }}>
          Âge: {age} ans
        </p>
      )}

      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        {exercises.map((exercise) => (
          <Link 
            key={exercise.id} 
            href={exercise.link}
            onClick={() => handleExerciseSelection(exercise.title)}
            className="button"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              backgroundColor: "#f0fdf4",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              textDecoration: "none",
              color: "#065f46",
              transition: "transform 0.2s",
              cursor: "pointer",
              width: "120px",
              
            }}
          >
            <img 
              src={exercise.image} 
              alt={exercise.title} 
              style={{ 
                width: "50px", 
                height: "50px", 
                objectFit: "cover",
                marginBottom: "10px" 
              }} 
            />
            <span>{exercise.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}