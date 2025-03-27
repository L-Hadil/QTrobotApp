"use client";

import Link from "next/link";
import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function LevelSelection() {
  const [currentExpression, setCurrentExpression] = useState("neutral");

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

      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#10b981" }}>Choisis ton niveau</h1>
      <div style={{
        display: "flex",
        gap: "20px",
      }}>
        <Link 
          href="/cp" 
          className="button" 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            borderRadius: "5px",
            fontSize: "1.2rem"
          }}
        >
          CP
        </Link>
        <Link 
          href="/ce1" 
          className="button" 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#2196F3", 
            color: "white", 
            borderRadius: "5px",
            fontSize: "1.2rem"
          }}
        >
          CE1
        </Link>
      </div>
    </div>
  );
}