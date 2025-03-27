"use client";
import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function SoustractionDifficile() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "sad" | "neutral" | "confused">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Exercices de soustraction niveau difficile (nombres jusqu'à 30, avec retenue)
  const exercises = [
    { question: "25 - 18 = ?", answer: 7 },
    { question: "30 - 14 = ?", answer: 16 },
    { question: "22 - 15 = ?", answer: 7 },
    { question: "28 - 19 = ?", answer: 9 },
    { question: "24 - 16 = ?", answer: 8 },
    { question: "27 - 18 = ?", answer: 9 },
    { question: "23 - 17 = ?", answer: 6 },
    { question: "29 - 21 = ?", answer: 8 },
    { question: "26 - 19 = ?", answer: 7 },
    { question: "30 - 22 = ?", answer: 8 },
    { question: "21 - 13 = ?", answer: 8 },
    { question: "27 - 19 = ?", answer: 8 },
    { question: "24 - 17 = ?", answer: 7 },
    { question: "28 - 20 = ?", answer: 8 },
    { question: "23 - 14 = ?", answer: 9 },
    { question: "29 - 23 = ?", answer: 6 },
    { question: "25 - 16 = ?", answer: 9 },
    { question: "30 - 25 = ?", answer: 5 },
    { question: "22 - 14 = ?", answer: 8 },
    { question: "26 - 18 = ?", answer: 8 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = exercises[currentQuestion].answer;
    const isAnswerCorrect = parseInt(userAnswer) === correctAnswer;

    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      setScore({ ...score, correct: score.correct + 1 });
      setCurrentExpression("happy");
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1 });
      setCurrentExpression("sad");
    }

    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer("");
      if (currentQuestion < exercises.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentExpression("neutral");
      } else {
        setCurrentExpression("happy");
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
      backgroundColor: "#f0fff0",
      fontFamily: "'Comic Sans MS', cursive, sans-serif"
    }}>
      <QTRobot expression={currentExpression} />
      
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "80%",
        maxWidth: "500px"
      }}>
        <h1 style={{ color: "#5cb85c", marginBottom: "1.5rem" }}>Soustraction CP - Niveau Difficile</h1>
        
        {currentQuestion < exercises.length ? (
          <>
            <div style={{ fontSize: "2rem", margin: "1.5rem 0", color: "#5cb85c" }}>
              {exercises[currentQuestion].question}
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
                  border: "2px solid #5cb85c",
                  borderRadius: "5px",
                  color: "#5cb85c"
                }}
                required
              />
              <br />
              <button 
                type="submit" 
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#5cb85c",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Valider
              </button>
            </form>
            
            {showFeedback && (
              <div style={{
                marginTop: "1rem",
                color: isCorrect ? "green" : "red",
                fontSize: "1.2rem"
              }}>
                {isCorrect ? "Excellent !" : `La réponse était ${exercises[currentQuestion].answer}`}
              </div>
            )}
          </>
        ) : (
          <div style={{ fontSize: "1.5rem", color: "#5cb85c" }}>
            <p>Mission accomplie !</p>
            <p>Score: {score.correct}/{exercises.length}</p>
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setScore({ correct: 0, incorrect: 0 });
                setCurrentExpression("neutral");
              }}
              style={{
                marginTop: "1rem",
                padding: "10px 20px",
                backgroundColor: "#5cb85c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              Recommencer
            </button>
          </div>
        )}
        
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "green" }}>Bonnes réponses: {score.correct}</div>
          <div style={{ color: "red" }}>Mauvaises réponses: {score.incorrect}</div>
        </div>
        <div style={{ marginTop: "1rem", width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px" }}>
          <div 
            style={{ 
              width: `${(currentQuestion / exercises.length) * 100}%`, 
              height: "10px", 
              backgroundColor: "#5cb85c",
              borderRadius: "5px",
              transition: "width 0.3s"
            }}
          ></div>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          Question {currentQuestion + 1}/{exercises.length}
        </div>
      </div>
    </div>
  );
}