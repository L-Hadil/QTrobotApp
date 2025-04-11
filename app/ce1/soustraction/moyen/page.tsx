"use client";
import { useEffect } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { saveActivityToSession } from "@/app/utils/sessionUtils";


export default function SoustractionMoyenCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" |"talking" |"sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const { speak } = useSpeech();
  useEffect(() => {
    localStorage.setItem("niveau", "CE1");
    localStorage.setItem("categorie", "Soustraction");
    localStorage.setItem("difficulte", "Moyen");
  }, []);
  
  useEffect(() => {
    speak(
      questions[currentQuestion].problem,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [currentQuestion]);
  const questions = [
    { problem: "52 - 27 =", answer: 25 },
    { problem: "83 - 45 =", answer: 38 },
    { problem: "71 - 38 =", answer: 33 },
    { problem: "64 - 29 =", answer: 35 },
    { problem: "95 - 57 =", answer: 38 },
    { problem: "76 - 48 =", answer: 28 },
    { problem: "62 - 39 =", answer: 23 },
    { problem: "87 - 59 =", answer: 28 },
    { problem: "53 - 27 =", answer: 26 },
    { problem: "91 - 64 =", answer: 27 },
    { problem: "74 - 46 =", answer: 28 },
    { problem: "85 - 67 =", answer: 18 },
    { problem: "63 - 45 =", answer: 18 },
    { problem: "92 - 75 =", answer: 17 },
    { problem: "57 - 39 =", answer: 18 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === questions[currentQuestion].answer;
  
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
    }));
  
    setCurrentExpression(isCorrect ? "happy" : "sad");
    setShowFeedback(true);
  
    // Enregistrement MongoDB
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
        maxWidth: "600px",
        width: "100%"
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#ff9800" }}>Soustractions Moyennes - CE1</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#ff9800" }}>Question {currentQuestion + 1}/{questions.length}</p>
        
        <div style={{ 
          fontSize: "1.5rem",
          marginBottom: "2rem",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px", 
          color: "#ff9800"
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
              border: "2px solid #ff9800",
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
              backgroundColor: "#ff9800",
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
            {parseInt(userAnswer) === questions[currentQuestion].answer ? "Excellent !" : `La réponse était ${questions[currentQuestion].answer}`}
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