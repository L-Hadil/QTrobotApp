"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { FaPlus, FaTimes, FaDivide } from "react-icons/fa";

// Charger QTRobot uniquement côté client
const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function Home() {
  const [currentExpression, setCurrentExpression] = useState<
  "afraid" | "angry" | "confused" | "cry" | "disgusted" | 
  "happy" | "kiss" | "neutral" | "sad" | "scream" | 
  "talking" | "yawn"
>("neutral");


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
      <div style={{ marginBottom: "2rem", flexDirection: "row" }}>
        <QTRobot expression={currentExpression} />
        
      </div>

      <h1 style={{
  display: "inline-block",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  padding: "15px 30px",
  borderRadius: "25px",
  fontFamily: "Arial Rounded MT Bold, sans-serif",
  fontSize: "2rem",
  color: "#2b4a2e",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(4px)",
  marginBottom: "2rem",
}}>
  Bienvenue sur QT Robot Math Tutor
</h1>

<Link href="/saisie-prenom" className="button" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", borderRadius: "5px" }}>
  Commencer
</Link>

      <Link href="/about" className="button" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", borderRadius: "5px" }}>About</Link>
      
    </div>
  );
}