"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RecapContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Anonyme";
  const age = searchParams.get("age") || "Inconnu";
  const correct = searchParams.get("correct");
  const total = searchParams.get("total");
  const time = searchParams.get("time");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "2rem 0",
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
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
            borderRadius: "8px"
          }}>
            <h3 style={{ color: "#6b7280", marginBottom: "0.5rem" }}>Niveau</h3>
            <p style={{ fontSize: "1.2rem",
              color: "#4caf50"
            }}>CE1 - Multiplication Difficile</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link 
            href="/selection-niveau"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3b82f6",
              color: "white",
              borderRadius: "30px",
              textDecoration: "none",
              fontSize: "1.1rem",
              transition: "all 0.3s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Nouveau jeu
          </Link>
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
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    }}>Chargement des résultats...</div>}>
      <RecapContent />
    </Suspense>
  );
}