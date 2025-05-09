"use client";
import { useEffect } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { saveActivityToSession } from "@/app/utils/sessionUtils";


export default function MultiplicationMoyenCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" |"talking" |"sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { speak } = useSpeech();
  useEffect(() => {
    localStorage.setItem("niveau", "CE1");
    localStorage.setItem("categorie", "Multiplication");
    localStorage.setItem("difficulte", "Moyen");
  }, []);
  
  useEffect(() => {
    speak(
      questions[currentQuestion].question,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [currentQuestion]);
  const questions = [
    { question: "3 × 2 = ?", answer: "6", table: 3 },
    { question: "4 × 3 = ?", answer: "12", table: 4 },
    { question: "6 × 1 = ?", answer: "6", table: 6 },
    { question: "3 × 5 = ?", answer: "15", table: 3 },
    { question: "4 × 4 = ?", answer: "16", table: 4 },
    { question: "6 × 2 = ?", answer: "12", table: 6 },
    { question: "3 × 7 = ?", answer: "21", table: 3 },
    { question: "4 × 6 = ?", answer: "24", table: 4 },
    { question: "6 × 3 = ?", answer: "18", table: 6 },
    { question: "3 × 9 = ?", answer: "27", table: 3 },
    { question: "4 × 7 = ?", answer: "28", table: 4 },
    { question: "6 × 5 = ?", answer: "30", table: 6 },
    { question: "3 × 4 = ?", answer: "12", table: 3 },
    { question: "4 × 8 = ?", answer: "32", table: 4 },
    { question: "6 × 6 = ?", answer: "36", table: 6 },
    { question: "3 × 8 = ?", answer: "24", table: 3 },
    { question: "4 × 9 = ?", answer: "36", table: 4 },
    { question: "6 × 7 = ?", answer: "42", table: 6 },
    { question: "3 × 6 = ?", answer: "18", table: 3 },
    { question: "4 × 5 = ?", answer: "20", table: 4 }
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
  
    //  Sauvegarde MongoDB immédiate
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#ff9800" }}>
          Tables de multiplication - Niveau Moyen
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#ff9800" }}>
          Question {currentQuestion + 1}/20 - Table de {questions[currentQuestion].table}
        </p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#ff9800" }}>
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
                backgroundColor: "#ff9800", 
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