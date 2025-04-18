"use client";
import { useEffect } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { saveActivityToSession } from "@/app/utils/sessionUtils";

export default function MultiplicationFacileCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" |"talking" |"sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { speak } = useSpeech();
  useEffect(() => {
    localStorage.setItem("niveau", "CE1");
    localStorage.setItem("categorie", "Multiplication");
    localStorage.setItem("difficulte", "Facile");
  }, []);
  
  useEffect(() => {
    speak(
      questions[currentQuestion].question,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [currentQuestion]);
  const questions = [
    { question: "1 × 5 = ?", answer: "5", table: 1 },
    { question: "2 × 3 = ?", answer: "6", table: 2 },
    { question: "5 × 4 = ?", answer: "20", table: 5 },
    { question: "10 × 2 = ?", answer: "20", table: 10 },
    { question: "1 × 8 = ?", answer: "8", table: 1 },
    { question: "2 × 5 = ?", answer: "10", table: 2 },
    { question: "5 × 6 = ?", answer: "30", table: 5 },
    { question: "10 × 5 = ?", answer: "50", table: 10 },
    { question: "1 × 0 = ?", answer: "0", table: 1 },
    { question: "2 × 8 = ?", answer: "16", table: 2 },
    { question: "5 × 3 = ?", answer: "15", table: 5 },
    { question: "10 × 7 = ?", answer: "70", table: 10 },
    { question: "1 × 10 = ?", answer: "10", table: 1 },
    { question: "2 × 7 = ?", answer: "14", table: 2 },
    { question: "5 × 9 = ?", answer: "45", table: 5 },
    { question: "10 × 10 = ?", answer: "100", table: 10 },
    { question: "2 × 4 = ?", answer: "8", table: 2 },
    { question: "5 × 5 = ?", answer: "25", table: 5 },
    { question: "10 × 3 = ?", answer: "30", table: 10 },
    { question: "2 × 9 = ?", answer: "18", table: 2 }
  ];

  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = userAnswer === questions[currentQuestion].answer;
  
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
    }));
  
    setCurrentExpression(isCorrect ? "happy" : "sad");
    setShowFeedback(true);
  
    //  Sauvegarde dans MongoDB
    await saveActivityToSession({
      correct: isCorrect ? 1 : 0,
      incorrect: !isCorrect ? 1 : 0,
    });
  
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setUserAnswer("");
        setShowFeedback(false);
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#4caf50" }}>
          Tables de multiplication - Niveau Facile
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#4caf50" }}>
          Question {currentQuestion + 1}/20 - Table de {questions[currentQuestion].table}
        </p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#4caf50" }}>
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
                backgroundColor: "#4caf50", 
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