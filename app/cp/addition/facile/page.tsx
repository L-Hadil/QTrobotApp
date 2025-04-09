"use client";

import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import QTRobot from "@/app/components/QTRobot";
import { saveSessionToDatabase } from "@/app/utils/saveToDatabase";

export default function AdditionFacilePage() {
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentExpression, setCurrentExpression] = useState<"happy" | "sad" | "neutral" | "talking">("neutral");

  const { speak } = useSpeech();

 
  useEffect(() => {
    localStorage.setItem("categorie", "Addition");
    localStorage.setItem("niveau", "CP");
    localStorage.setItem("difficulte", "facile");
  }, []);

  useEffect(() => {
    if (currentQuestion === 20) {
      const niveau = localStorage.getItem("niveau") || "";
      const categorie = localStorage.getItem("categorie") || "";
      const difficulte = localStorage.getItem("difficulte") || "";
  
      saveSessionToDatabase({
        correct: score.correct,
        incorrect: score.incorrect,
        niveau,
        categorie,
        difficulte,
      });
    }
  }, [currentQuestion]);
  
  const generateExercise = () => {
    const a = Math.floor(Math.random() * 6);
    const b = Math.floor(Math.random() * 6);
    return {
      question: `${a} + ${b} = ?`,
      answer: a + b,
      explanation: `Quand on ajoute ${a} et ${b}, on obtient ${a + b}.`
    };
  };

  const [exercise, setExercise] = useState(generateExercise());

  useEffect(() => {
    speak(
      exercise.question,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [exercise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === exercise.answer;

    if (isCorrect) {
      const newCorrect = score.correct + 1;
      setScore({ ...score, correct: newCorrect });
      setCurrentExpression("happy");
      localStorage.setItem("correct", newCorrect.toString());
    } else {
      const newIncorrect = score.incorrect + 1;
      setScore({ ...score, incorrect: newIncorrect });
      setCurrentExpression("sad");
      localStorage.setItem("incorrect", newIncorrect.toString());
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#3b82f6" }}>
          Addition facile (nombres de 0 à 5)
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "black" }}>
          Question {currentQuestion}/20
        </p>

        <div style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1.5rem 0",
          color: "#1e40af"
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
                border: "2px solid #3b82f6",
                borderRadius: "8px",
                marginRight: "10px",
                color: "black"
              }}
              min="0"
              max="10"
              required
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#3b82f6",
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
              {parseInt(userAnswer) === exercise.answer ? "Bravo !" : "Oops !"}
            </p>
            <p style={{ fontSize: "1.1rem" }}>{exercise.explanation}</p>
            {currentQuestion < 20 && (
              <button
                onClick={nextQuestion}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#10b981",
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
            backgroundColor: "#e0f2fe",
            borderRadius: "8px"
          }}>
            <h2 style={{ color: "#1e40af" }}>Résultat final</h2>
            <p style={{ fontSize: "1.2rem" }}>
              Tu as réussi {score.correct} sur 20 questions !
            </p>
            <p style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: score.correct >= 15 ? "#10b981" : score.correct >= 10 ? "#f59e0b" : "#ef4444"
            }}>
              {score.correct >= 15 ? "Excellent !" : score.correct >= 10 ? "Pas mal !" : "Continue à t'entraîner !"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
