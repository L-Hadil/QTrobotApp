"use client";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import QTRobot from "@/app/components/QTRobot";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RecapContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Anonyme";
  const age = searchParams.get("age") || "Inconnu";
  const correct = searchParams.get("correct") || "0";
  const total = searchParams.get("total") || "0";
  const time = searchParams.get("time") || "0";
  const { speak } = useSpeech();
  
  // QT Robot expression state
  const [currentExpression, setCurrentExpression] = useState<"happy" | "sad" | "neutral" | "talking">("neutral");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  // Calculate performance percentage
  const percentage = Math.round((Number(correct) / Number(total)) * 100);
  
  // Set QT Robot expression based on performance
  useEffect(() => {
    if (percentage >= 70) {
      setCurrentExpression("happy");
      speak(
        `Félicitations ${name}! Tu as réussi ${correct} sur ${total} questions.`,
        () => setCurrentExpression("talking"),
        () => setCurrentExpression("happy")
      );
    } else if (percentage >= 40) {
      setCurrentExpression("neutral");
      speak(
        `Bien joué ${name}! Tu as obtenu ${correct} bonnes réponses sur ${total}.`,
        () => setCurrentExpression("talking"),
        () => setCurrentExpression("neutral")
      );
    } else {
      setCurrentExpression("sad");
      speak(
        `Courage ${name}! Tu as fait ${correct} bonnes réponses sur ${total}. Tu feras mieux la prochaine fois!`,
        () => setCurrentExpression("talking"),
        () => setCurrentExpression("sad")
      );
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      backgroundImage: "url('/images/background-image.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      padding: "2rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* QT Robot Display */}
      <div style={{ 
        margin: "1rem 0",
        transform: "scale(0.8)" 
      }}>
        <QTRobot expression={currentExpression} />
      </div>

      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "rgba(248, 249, 250, 0.9)",
        borderRadius: "10px",
        textAlign: "center",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ color: "#4caf50", marginBottom: "1.5rem" }}>
          Résultats de {name} ({age} ans)
        </h1>

        <div style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem"
          }}>
            <div>
              <h3 style={{ color: "#6b7280", marginBottom: "0.5rem" }}>Score</h3>
              <p style={{ 
                fontSize: "2rem", 
                fontWeight: "bold",
                color: "#4caf50"
              }}>
                {correct}/{total}
              </p>
            </div>
            <div>
              <h3 style={{ color: "#6b7280", marginBottom: "0.5rem" }}>Temps</h3>
              <p style={{ 
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#F01f50"
              }}>
                {formatTime(Number(time))}
              </p>
            </div>
          </div>

          <div style={{ 
            backgroundColor: "#f0fdf4",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem"
          }}>
            <h3 style={{ color: "#6b7280", marginBottom: "0.5rem" }}>Performance</h3>
            <div style={{
              height: "20px",
              backgroundColor: "#e5e7eb",
              borderRadius: "10px",
              marginBottom: "0.5rem",
              overflow: "hidden"
            }}>
              <div 
                style={{
                  height: "100%",
                  width: `${percentage}%`,
                  backgroundColor: percentage >= 70 ? "#4caf50" : 
                                   percentage >= 40 ? "#f59e0b" : "#ef4444",
                  transition: "width 1s ease-in-out"
                }}
              />
            </div>
            <p style={{ fontSize: "1.2rem", color: "#4caf50" }}>
              {percentage >= 70 ? "Excellent!" : 
               percentage >= 40 ? "Pas mal!" : "Continue à t'entraîner!"}
            </p>
          </div>

          <div style={{ 
            backgroundColor: "#f0fdf4",
            padding: "1rem",
            borderRadius: "8px"
          }}>
            <h3 style={{ color: "#6b7280", marginBottom: "0.5rem" }}>Niveau</h3>
            <p style={{ fontSize: "1.2rem", color: "#4caf50" }}>
              CE1 - Multiplication Difficile
            </p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link 
            href="/" 
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4caf50",
              color: "white",
              borderRadius: "30px",
              textDecoration: "none",
              fontSize: "1.1rem",
              transition: "all 0.3s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RecapPage() {
  return (
    <Suspense fallback={<div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      backgroundImage: "url('/images/background-image.jpg')",
      backgroundSize: "cover",
    }}>Chargement des résultats...</div>}>
      <RecapContent />
    </Suspense>
  );
}