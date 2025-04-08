"use client";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech"; 
import QTRobot from "@/app/components/QTRobot";

export default function AdditionDifficilePage() {
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const generateExercise = () => {
    const a = Math.floor(Math.random() * 21); // Nombres de 0 à 20
    const b = Math.floor(Math.random() * 21);
    // Ajout d'une aide visuelle pour certaines questions
    const visualHelp = Math.random() > 0.7 ? 
      `\n(Par exemple: ${a} + ${b} = ${a} + ${10} + ${b-10} = ${a+10} + ${b-10} = ${a+b})` : 
      "";
    return { 
      question: `${a} + ${b} = ?`, 
      answer: a + b,
      explanation: `Astuce: tu peux décomposer ${b} en 10 + ${b-10} pour faciliter le calcul.${visualHelp}`
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#ef4444" }}>Addition difficile (nombres de 0 à 20)</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "black" }}>Question {currentQuestion}/20</p>
        
        <div style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1.5rem 0",
          color: "#991b1b"
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
                border: "2px solid #ef4444",
                borderRadius: "8px",
                marginRight: "10px",
                color: "black"
              }}
              min="0"
              max="40"
              required
            />
            <button 
              type="submit" 
              style={{ 
                padding: "10px 20px",
                backgroundColor: "#ef4444",
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
              {parseInt(userAnswer) === exercise.answer ? "Fantastique !" : "Essaie encore !"}
            </p>
            <p style={{ fontSize: "1.1rem", whiteSpace: "pre-line" }}>{exercise.explanation}</p>
            {currentQuestion < 20 && (
              <button 
                onClick={nextQuestion}
                style={{ 
                  padding: "10px 20px",
                  backgroundColor: "#f59e0b",
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
            backgroundColor: "#fee2e2",
            borderRadius: "8px"
          }}>
            <h2 style={{ color: "#991b1b" }}>Résultat final</h2>
            <p style={{ fontSize: "1.2rem" }}>
              Tu as réussi {score.correct} sur 20 questions !
            </p>
            <p style={{ 
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: score.correct >= 17 ? "#10b981" : score.correct >= 14 ? "#f59e0b" : "#ef4444"
            }}>
              {score.correct >= 17 ? "Incroyable !" : score.correct >= 14 ? "Très bien !" : "Courage, continue !"}
            </p>
            {score.correct < 17 && (
              <div style={{ marginTop: "0.5rem" }}>
                <p>N'hésite pas à :</p>
                <ul style={{ textAlign: "left", margin: "0.5rem 0 0 1rem" }}>
                  <li>Utiliser tes doigts pour compter</li>
                  <li>Décomposer les nombres (10 + x)</li>
                  <li>Prendre ton temps</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}