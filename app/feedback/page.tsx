"use client";

import { useGlobalTimer } from "@/app/context/TimerContext";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import { updateSessionFeedback } from "@/app/utils/sessionUtils";

const expressions = [
  { expression: "happy", label: "J'ai adoré !" },
  { expression: "neutral", label: "C'était bien" },
  { expression: "confused", label: "Un peu difficile" },
  { expression: "sad", label: "Je n'ai pas aimé" },
];

export default function FeedbackPage() {
  const { minutes, seconds, stopTimer } = useGlobalTimer();
  const [prenom, setPrenom] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [currentExpression, setCurrentExpression] = useState<"talking" | "neutral">("neutral");
  const { speak } = useSpeech();
  const storedAge = localStorage.getItem("age") || "0";


  useEffect(() => {
    const storedPrenom = localStorage.getItem("prenom") || "anonyme";
    setPrenom(storedPrenom);
    stopTimer();

    speak(
      `Merci ${storedPrenom} d’avoir utilisé QT Robot. Tu as passé ${minutes} minutes et ${seconds} secondes avec nous. Dis-nous ce que tu as pensé de cette aventure en choisissant une des expressions ci-dessous.`,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, []);

  const handleSelect = async (expr: string) => {
    setSelected(expr);
  
    const niveau = localStorage.getItem("niveau") || "Inconnu";
    const age = parseInt(localStorage.getItem("age") || "0"); // ✅ conversion ici
  
    await updateSessionFeedback({
      prenom,
      age, // ✅ maintenant c'est bien un nombre
      niveau,
      expression: expr,
      duration: minutes * 60 + seconds,
    });
  };
  
  

  return (
    <div style={{
      padding: "20px",
      textAlign: "center",
      minHeight: "100vh",
      backgroundImage: "url('/images/background.png')",
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{ color: "#2e7d32", fontSize: "2rem", marginBottom: "0.5rem" }}>
        Merci {prenom} d’avoir utilisé QT Robot
      </h1>
      <p style={{ marginBottom: "1.5rem", color: "#333", fontSize: "1.1rem" }}>
        Tu as passé {minutes} minutes et {seconds} secondes avec nous.
      </p>

      <h2 style={{
        margin: "1.5rem 0",
        fontSize: "1.3rem",
        color: "#2b2b2b",
        backgroundColor: "rgba(255,255,255,0.8)",
        padding: "10px 20px",
        borderRadius: "12px"
      }}>
        Comment tu as trouvé cette expérience ?
      </h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: "20px 30px",
        borderRadius: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        maxWidth: "800px"
      }}>
        {expressions.map(({ expression, label }) => (
          <div
            key={expression}
            onClick={() => handleSelect(expression)}
            style={{
              cursor: "pointer",
              textAlign: "center",
              transition: "transform 0.3s, border 0.3s",
              transform: selected === expression ? "scale(1.1)" : "scale(1)",
            }}
          >
            <img
              src={`/gifs/QT_QT_${expression}.gif`}
              alt={label}
              style={{
                width: "110px",
                height: "auto",
                borderRadius: "14px",
                border: selected === expression
                  ? "4px solid #10b981"
                  : "2px solid transparent",
                backgroundColor: "#ffffffcc",
                padding: "6px"
              }}
            />
            <p style={{
              marginTop: "0.5rem",
              fontWeight: "bold",
              color: "#333",
              fontSize: "1rem",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "5px 10px",
              display: "inline-block"
            }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {selected && (
  <p style={{
    fontSize: "1.3rem",
    color: "#10b981",
    marginTop: "2rem",
    backgroundColor: "#e6f5f0",
    padding: "12px 24px",
    borderRadius: "10px"
  }}>
    Merci pour ton retour {prenom}
  </p>
)}

{/* === Ajoute ce bouton ici === */}
<button
  onClick={() => {
    window.location.href = "/saisie-prenom";
  }}
  style={{
    marginTop: "2.5rem",
    padding: "12px 28px",
    fontSize: "1.1rem",
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s"
  }}
  onMouseOver={(e) => {
    (e.currentTarget.style.transform = "scale(1.05)");
  }}
  onMouseOut={(e) => {
    (e.currentTarget.style.transform = "scale(1)");
  }}
>
  Recommencer
</button>

    </div>
  );
}
