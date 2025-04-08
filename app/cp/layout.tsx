"use client";

import { useGlobalTimer } from "@/app/context/TimerContext";
import { useRouter } from "next/navigation";

export default function CPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { minutes, seconds } = useGlobalTimer();
  const router = useRouter();

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Timer en haut à droite */}
      <div style={{
        position: "absolute",
        top: "10px",
        right: "20px",
        fontSize: "1rem",
        color: "#555",
        background: "rgba(255,255,255,0.8)",
        padding: "6px 12px",
        borderRadius: "8px",
        zIndex: 1000
      }}>
        ⏱ Temps passé : {minutes} min {seconds < 10 ? `0${seconds}` : seconds}s
      </div>

      {/* Bouton terminer la session en haut à gauche */}
      <div style={{
        position: "absolute",
        top: "10px",
        left: "20px",
        zIndex: 1000
      }}>
        <button
          onClick={() => router.push("/feedback")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Terminer la session
        </button>
      </div>

      {/* Contenu de la page */}
      {children}
    </div>
  );
}
