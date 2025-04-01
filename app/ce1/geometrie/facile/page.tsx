"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function GeometrieFacileCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "confused" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "Quelle forme est un cube?",
      image: "/images/cube.png",
      answer: "cube",
      options: ["cube", "boule", "pyramide"]
    },
    {
      question: "Quelle forme est ronde comme un ballon?",
      image: "/images/balle.png",
      answer: "boule",
      options: ["cube", "boule", "cylindre"]
    },
    {
      question: "Quelle forme a 6 faces carrées identiques?",
      answer: "cube",
      options: ["cube", "pyramide", "cylindre"]
    },
    {
      question: "Quelle forme ressemble à une boîte de céréales?",
      image: "/images/boite.png",
      answer: "pavé droit",
      options: ["cube", "pavé droit", "cône"]
    },
    {
      question: "Quelle forme ressemble à un glace cornet?",
      image: "/images/cone.png",
      answer: "cône",
      options: ["pyramide", "cône", "cylindre"]
    },
    {
      question: "Quelle forme peut rouler?",
      image: "/images/balle.png",
      answer: "boule",
      options: ["cube", "boule", "pyramide"]
    },
    {
      question: "Où est la droite symétrique dans cette figure?",
      image: "/images/symetrie-facile.png",
      answer: "verticale",
      options: ["horizontale", "verticale", "diagonale"]
    },
    {
      question: "Quelle partie manque pour compléter la figure symétrique?",
      image: "/images/symetrie-partie-manquante.png",
      answer: "triangle",
      options: ["carré", "triangle", "rond"]
    },
    {
      question: "Quelle case est à gauche de la case B3?",
      image: "/images/grid.png",
      answer: "A3",
      options: ["A3", "B2", "C3"]
    },
    {
      question: "Comment se déplacer de A1 à C1?",
      image: "/images/grid.png",
      answer: "2 cases vers la droite",
      options: ["2 cases vers le bas", "2 cases vers la droite", "1 case en diagonale"]
    }
  ];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
    
    if (option === questions[currentQuestion].answer) {
      setScore({ ...score, correct: score.correct + 1 });
      setCurrentExpression("happy");
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1 });
      setCurrentExpression("sad");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowFeedback(false);
        setCurrentExpression("neutral");
      }
    }, 1500);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      padding: "20px",
      fontFamily: "'Comic Sans MS', cursive, sans-serif"
    }}>
      <div style={{ marginBottom: "2rem" }}>
        <QTRobot expression={currentExpression} />
      </div>

      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        width: "100%"
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#4caf50" }}>Géométrie CE1 - Niveau Facile</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#4caf50" }}>Question {currentQuestion + 1}/10</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#4caf50" }}>{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].image && (
            <img 
              src={questions[currentQuestion].image} 
              alt="Illustration" 
              style={{ 
                maxWidth: "300px", 
                margin: "0 auto 1rem", 
                border: "1px solid #ddd",
                borderRadius: "8px"
              }} 
            />
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                style={{
                  padding: "10px",
                  backgroundColor: 
                    showFeedback 
                      ? option === questions[currentQuestion].answer 
                        ? "#4CAF50" 
                        : option === selectedOption 
                          ? "#F44336" 
                          : "#f0f0f0"
                      : "#f0f0f0",
                  color: 
                    showFeedback && option === questions[currentQuestion].answer 
                      ? "white" 
                      : "black",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  fontSize: "1rem"
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "1.1rem"
        }}>
          <p style={{ color: "#4CAF50" }}>Bonnes réponses: {score.correct}</p>
          <p style={{ color: "#F44336" }}>Mauvaises réponses: {score.incorrect}</p>
        </div>
      </div>
    </div>
  );
}