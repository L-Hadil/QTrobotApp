"use client";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech"; 
import QTRobot from "@/app/components/QTRobot";

export default function AdditionMoyenPage() {

  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const generateExercise = () => {
    const a = Math.floor(Math.random() * 11);
    const b = Math.floor(Math.random() * 11);
    return { 
      question: `${a} + ${b} = ?`, 
      answer: a + b,
      explanation: `Si tu as ${a} bonbons et qu'on t'en donne ${b} de plus, tu auras ${a + b} bonbons.`
    };
  };

  const [exercise, setExercise] = useState(generateExercise());
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === exercise.answer) {
      setScore({ ...score, correct: score.correct + 1 });
      setCurrentExpression("happy");
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1 });
      setCurrentExpression("sad");
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < 20) {
      setCurrentQuestion(currentQuestion + 1);
      setExercise(generateExercise());
      setUserAnswer("");
      setCurrentExpression("neutral");
      setShowResult(false);
    }
  };
  const [currentExpression, setCurrentExpression] = useState<"happy" | "sad" | "neutral" | "talking">("neutral");
  const { speak } = useSpeech();
  useEffect(() => {
    speak(
      exercise.question,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [exercise]);
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
      <div style={{ marginBottom: "1rem" }}>
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#10b981" }}>Addition moyenne (nombres de 0 à 10)</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "black" }}>Question {currentQuestion}/20</p>
        
        <div style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1.5rem 0",
          color: "#065f46"
        }}>
          {exercise.question}
        </div>

        {!showResult ? (
          <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{ 
                padding: "10px",
                fontSize: "1.5rem",
                width: "100px",
                textAlign: "center",
                border: "2px solid #10b981",
                borderRadius: "8px",
                marginRight: "10px",
                color: "black"
              }}
              min="0"
              max="20"
              required
            />
            <button 
              type="submit" 
              style={{ 
                padding: "10px 20px",
                backgroundColor: "#10b981",
                color: "white",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              Valider
            </button>
          </form>
        ) : (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ 
              fontSize: "1.2rem",
              color: parseInt(userAnswer) === exercise.answer ? "#10b981" : "#ef4444",
              fontWeight: "bold"
            }}>
              {parseInt(userAnswer) === exercise.answer ? "Super !" : "Presque !"}
            </p>
            <p style={{ fontSize: "1.1rem" }}>{exercise.explanation}</p>
            {currentQuestion < 20 && (
              <button 
                onClick={nextQuestion}
                style={{ 
                  padding: "10px 20px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginTop: "1rem"
                }}
              >
                Question suivante
              </button>
            )}
          </div>
        )}

        <div style={{ 
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1.5rem"
        }}>
          <div style={{ color: "#10b981" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Bonnes réponses</p>
            <p style={{ fontSize: "1.5rem" }}>{score.correct}</p>
          </div>
          <div style={{ color: "#ef4444" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Mauvaises réponses</p>
            <p style={{ fontSize: "1.5rem" }}>{score.incorrect}</p>
          </div>
        </div>

        {currentQuestion === 20 && (
          <div style={{ 
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#dcfce7",
            borderRadius: "8px"
          }}>
            <h2 style={{ color: "#065f46" }}>Résultat final</h2>
            <p style={{ fontSize: "1.2rem" }}>
              Tu as réussi {score.correct} sur 20 questions !
            </p>
            <p style={{ 
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: score.correct >= 16 ? "#10b981" : score.correct >= 12 ? "#f59e0b" : "#ef4444"
            }}>
              {score.correct >= 16 ? "Génial !" : score.correct >= 12 ? "Bien joué !" : "Tu progresses !"}
            </p>
            {score.correct < 16 && (
              <p style={{ marginTop: "0.5rem" }}>
                N'hésite pas à recommencer pour t'améliorer !
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}