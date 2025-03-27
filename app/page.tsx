"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { FaPlus, FaTimes, FaDivide } from "react-icons/fa";

// Charger QTRobot uniquement côté client
const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function Home() {
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
      <div style={{ marginBottom: "2rem", flexDirection: "row" }}>
        <QTRobot expression={currentExpression} />
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Bienvenue sur QT Robot Math Tutor</h1>
      <Link href="/selection-niveau" className="button" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", borderRadius: "5px" }}>Commencer</Link>
      <Link href="/about" className="button" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", borderRadius: "5px" }}>About</Link>
    </div>
  );
}