"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function SoustractionFacileCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "confused" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    { problem: "45 - 23 =", answer: 22 },
    { problem: "78 - 36 =", answer: 42 },
    { problem: "59 - 24 =", answer: 35 },
    { problem: "87 - 52 =", answer: 35 },
    { problem: "96 - 45 =", answer: 51 },
    { problem: "63 - 31 =", answer: 32 },
    { problem: "89 - 47 =", answer: 42 },
    { problem: "74 - 53 =", answer: 21 },
    { problem: "58 - 26 =", answer: 32 },
    { problem: "67 - 35 =", answer: 32 },
    { problem: "92 - 61 =", answer: 31 },
    { problem: "85 - 43 =", answer: 42 },
    { problem: "79 - 58 =", answer: 21 },
    { problem: "66 - 44 =", answer: 22 },
    { problem: "93 - 72 =", answer: 21 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === questions[currentQuestion].answer;
    
    if (isCorrect) {
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
        maxWidth: "600px",
        width: "100%"
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#4caf50" }}>Soustractions Faciles - CE1</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#4caf50" }}>Question {currentQuestion + 1}/{questions.length}</p>
        
        <div style={{ 
          fontSize: "1.5rem",
          marginBottom: "2rem",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px", 
          color: "#4caf50"
        }}>
          {questions[currentQuestion].problem}
        </div>

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
              marginBottom: "1rem",
              border: "2px solid #4caf50",
              borderRadius: "5px",
              color:"black"
            }}
            disabled={showFeedback}
          />
          <br />
          <button 
            type="submit" 
            style={{ 
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer"
            }}
            disabled={showFeedback}
          >
            Valider
          </button>
        </form>

        {showFeedback && (
          <div style={{ 
            marginTop: "1rem",
            fontSize: "1.2rem",
            color: parseInt(userAnswer) === questions[currentQuestion].answer ? "#4caf50" : "#f44336"
          }}>
            {parseInt(userAnswer) === questions[currentQuestion].answer ? "Bravo !" : `La réponse était ${questions[currentQuestion].answer}`}
          </div>
        )}

        <div style={{ 
          marginTop: "2rem",
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