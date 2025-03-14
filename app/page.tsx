"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { FaPlus, FaTimes, FaDivide } from "react-icons/fa";

// Charger QTRobot uniquement côté client
const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function Home() {
  const [currentExpression, setCurrentExpression] = useState("neutral");

  // Example exercise topics
  const exercises = [
    {
      id: 1,
      title: "Addition",
      link: "/addition",
      icon: <FaPlus />,
      image: "/images/addition.jpg", // Chemin de l'image
    },
    {
      id: 2,
      title: "Multiplication",
      link: "/multiplication",
      icon: <FaTimes />,
      image: "/images/multiplication.jpg", // Chemin de l'image
    },
    {
      id: 3,
      title: "Division",
      link: "/division",
      icon: <FaDivide />,
      image: "/images/division.jpg", // Chemin de l'image
    },
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
      {/* Conteneur pour le robot */}
      <div style={{ marginBottom: "2rem" }}>
        <QTRobot expression={currentExpression} />
      </div>

      {/* Contenu sous le robot */}
      <div>
        <h2>Math Topics</h2>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}>
          {exercises.map((exercise) => (
            <Link key={exercise.id} href={exercise.link} className="button">
              <img src={exercise.image} alt={exercise.title} style={{ width: "50px", marginBottom: "10px" }} />
              <span style={{ marginLeft: "10px" }}>{exercise.title}</span>
            </Link>
          ))}
        </div>
        <Link href="/about" className="button" style={{ marginTop: "20px", display: "block" }}>About</Link>
      </div>
    </div>
  );
}