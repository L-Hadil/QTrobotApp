"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function MultiplicationDifficileCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "confused" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    { question: "7 × 2 = ?", answer: "14", table: 7 },
    { question: "8 × 3 = ?", answer: "24", table: 8 },
    { question: "9 × 4 = ?", answer: "36", table: 9 },
    { question: "7 × 5 = ?", answer: "35", table: 7 },
    { question: "8 × 4 = ?", answer: "32", table: 8 },
    { question: "9 × 5 = ?", answer: "45", table: 9 },
    { question: "7 × 7 = ?", answer: "49", table: 7 },
    { question: "8 × 6 = ?", answer: "48", table: 8 },
    { question: "9 × 7 = ?", answer: "63", table: 9 },
    { question: "7 × 8 = ?", answer: "56", table: 7 },
    { question: "8 × 7 = ?", answer: "56", table: 8 },
    { question: "9 × 8 = ?", answer: "72", table: 9 },
    { question: "7 × 9 = ?", answer: "63", table: 7 },
    { question: "8 × 8 = ?", answer: "64", table: 8 },
    { question: "9 × 9 = ?", answer: "81", table: 9 },
    { question: "7 × 6 = ?", answer: "42", table: 7 },
    { question: "8 × 9 = ?", answer: "72", table: 8 },
    { question: "9 × 6 = ?", answer: "54", table: 9 },
    { question: "7 × 4 = ?", answer: "28", table: 7 },
    { question: "8 × 5 = ?", answer: "40", table: 8 }
  ];

  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userAnswer === questions[currentQuestion].answer) {
      setScore({ ...score, correct: score.correct + 1 });
      setCurrentExpression("happy");
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1 });
      setCurrentExpression("sad");
    }

    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer("");
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
        maxWidth: "500px",
        width: "100%"
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#f44336" }}>
          Tables de multiplication - Niveau Difficile
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#f44336" }}>
          Question {currentQuestion + 1}/20 - Table de {questions[currentQuestion].table}
        </p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#f44336" }}>
            {questions[currentQuestion].question}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "1.5rem",
                width: "100px",
                textAlign: "center",
                border: showFeedback 
                  ? userAnswer === questions[currentQuestion].answer 
                    ? "2px solid #4caf50" 
                    : "2px solid #f44336"
                  : "2px solid #ddd",
                borderRadius: "5px",
                color:"black"
              }}
              disabled={showFeedback}
            />
            <button 
              type="submit" 
              style={{ 
                padding: "10px 20px", 
                backgroundColor: "#f44336", 
                color: "white", 
                borderRadius: "5px",
                marginLeft: "10px",
                fontSize: "1.1rem"
              }}
              disabled={showFeedback}
            >
              Valider
            </button>
          </form>
        </div>

        {showFeedback && (
          <div style={{ 
            marginBottom: "1rem",
            fontSize: "1.2rem",
            color: userAnswer === questions[currentQuestion].answer ? "#4caf50" : "#f44336"
          }}>
            {userAnswer === questions[currentQuestion].answer ? "Bravo !" : `Réponse : ${questions[currentQuestion].answer}`}
          </div>
        )}

        <div style={{ 
          display: "flex",
          justifyContent: "space-around",
          fontSize: "1.1rem"
        }}>
          <p style={{ color: "#4caf50" }}>Bonnes réponses: {score.correct}</p>
          <p style={{ color: "#f44336" }}>Mauvaises réponses: {score.incorrect}</p>
        </div>
      </div>
    </div>
  );
}