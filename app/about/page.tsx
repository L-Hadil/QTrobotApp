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
  color: "black",
  backgroundImage: "url('/your-background-image.jpg')", // Tu peux garder le fond s'il est mis dans le CSS global
}}>
  {/* Robot QT */}
  <div style={{ marginBottom: "2rem" }}>
    <QTRobot expression="kiss" />
  </div>

  {/* Boîte de contenu avec fond arrondi */}
  <div style={{
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "20px",
    padding: "30px",
    maxWidth: "700px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  }}>
    <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>À propos de QT Robot</h2>
    <p style={{ lineHeight: "1.6", marginBottom: "2rem" }}>
      QT Robot est un robot éducatif <strong>innovant</strong> conçu pour rendre l'apprentissage des mathématiques amusant et interactif pour les enfants.
      Avec son visage expressif et sa personnalité engageante, QT Robot fournit un retour émotionnel afin d'encourager une expérience d'apprentissage positive et motivante.
      Que ce soit l'addition, la multiplication ou la division, QT Robot est là pour guider votre enfant dans son parcours mathématique avec patience et enthousiasme.
    </p>

    <p style={{ marginBottom: "1rem" }}>
      Découvrez-en plus sur QT Robot et ses applications dans l'éducation spécialisée :
    </p>
    <div style={{ marginBottom: "1rem" }}>
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
        Visitez LuxAI
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
        QT Robot pour l'Éducation Spécialisée
      </a>
    </div>

    <Link href="/" style={{
      backgroundColor: "#001500",
      color: "white",
      padding: "10px 20px",
      borderRadius: "20px",
      textDecoration: "none",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
      display: "inline-block",
    }}>
      Retour à l'accueil
    </Link>
  </div>
</div>

  );
}
