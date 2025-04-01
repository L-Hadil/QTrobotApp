"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function GeometrieMoyenCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "confused" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "Quel solide a une base carrée et 4 faces triangulaires?",
      image: "/images/pyramide.png",
      answer: "pyramide",
      options: ["cube", "pyramide", "prisme"]
    },
    {
      question: "Quel solide peut à la fois rouler et glisser?",
      image: "/images/solides.png",
      answer: "cylindre",
      options: ["boule", "cylindre", "cône"]
    },
    {
      question: "Combien de sommets a un cube?",
      image: "/images/cube.png",
      answer: "8",
      options: ["4", "6", "8"]
    },
    {
      question: "Quelle figure est symétrique par rapport à cette droite?",
      image: "/images/symetrie-moyen.png",
      answer: "B",
      options: ["A", "B", "C"]
    },
    {
        question: "Quelle figure est symétrique par rapport à cette droite?",
        image: "/images/symetrie-moyen2.png",
        answer: "F",
        options: ["D", "E", "F"]
    },
    {
      question: "Comment se déplacer de B2 à D3?",
      image: "/images/grid.png",
      answer: "2 cases à droite et 1 case vers le bas",
      options: [
        "1 case à droite et 1 case vers le bas",
        "2 cases à droite et 1 case vers le bas",
        "2 cases vers le bas"
      ]
    },
    {
      question: "Quelle case est au nord-ouest de D3?",
      image: "/images/grid.png",
      answer: "C2",
      options: ["C2", "C4", "E2"]
    },
    {
      question: "Combien d'arêtes a une pyramide à base carrée?",
      image: "/images/pyramide.png",
      answer: "8",
      options: ["5", "8", "12"]
    },
    {
      question: "Quel solide n'a pas de face plane?",
      image: "/images/solides.png",
      answer: "boule",
      options: ["cube", "boule", "pyramide"]
    },
    {
      question: "Quelle est la position du cône par rapport à la sphère?",
      image: "/images/solides.png",
      answer: "en bas à droite",
      options: ["en bas à droite", "en haut à droite", "au centre"]
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#ff9800" }}>Géométrie CE1 - Niveau Moyen</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#ff9800" }}>Question {currentQuestion + 1}/10</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#ff9800" }}>{questions[currentQuestion].question}</h2>
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