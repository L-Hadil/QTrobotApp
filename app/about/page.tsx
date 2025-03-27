"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Charger QTRobot uniquement côté client
const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function About() {
  return (
    <div style={{
      textAlign: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      color: "black", // Texte en blanc pour contraster avec l'arrière-plan
    }}>
      {/* Robot QT */}
      <div style={{ marginBottom: "2rem" }}>
        <QTRobot expression="neutral" />
      </div>

      {/* Titre et texte */}
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>About QT Robot</h2>
      <p style={{ maxWidth: "600px", lineHeight: "1.6", marginBottom: "2rem" }}>
        QT Robot is an innovative educational robot designed to make learning math fun and interactive for children. 
        With its expressive face and engaging personality, QT Robot provides emotional feedback to encourage a positive 
        and motivating learning experience. Whether it's addition, multiplication, or division, QT Robot is here to 
        guide your child through their math journey with patience and enthusiasm.
      </p>

      {/* Liens vers les sites de LuxAI */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ marginBottom: "1rem" }}>
          Discover more about QT Robot and its applications in special needs education:
        </p>
        <a
          href="https://luxai.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#001500",
            textDecoration: "underline",
            margin: "0 10px",
          }}
        >
          Visit LuxAI
        </a>
        <a
          href="https://luxai.com/assistive-tech-robot-for-special-needs-education/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#001500",
            textDecoration: "underline",
            margin: "0 10px",
          }}
        >
          QT Robot for Special Needs Education
        </a>
      </div>

      {/* Bouton pour retourner à la page d'accueil */}
      <Link href="/" style={{
        backgroundColor: "#001500",
        color: "white",
        padding: "10px 20px",
        borderRadius: "20px",
        textDecoration: "none",
        fontSize: "1rem",
        transition: "background-color 0.3s ease",
      }}>
        Back to Home
      </Link>
    </div>
  );
}