"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { useEffect } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";

export default function MesuresDifficileCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" |"talking" |"sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { speak } = useSpeech();

  useEffect(() => {
    speak(
      questions[currentQuestion].question,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [currentQuestion]);
  const questions = [
    {
      question: "Combien de mètres y a-t-il dans 3km et 25m?",
      answer: "3025",
      options: ["325", "3025", "3250", "30025"],
      explanation: "3km = 3000m, 3000m + 25m = 3025m"
    },
    {
      question: "Quelle heure sera-t-il dans 2h30 si maintenant il est 9h45?",
      answer: "12h15",
      options: ["11h15", "12h15", "12h45", "13h15"],
      explanation: "9h45 + 2h = 11h45, 11h45 + 30min = 12h15"
    },
    {
      question: "Si un mètre de tissu coûte 15€, combien coûtent 3,5 mètres?",
      answer: "52€50",
      options: ["45€", "50€", "52€50", "55€"],
      explanation: "3m × 15€ = 45€, 0,5m = 7€50, total = 45€ + 7€50 = 52€50"
    },
    {
      question: "Combien de centilitres y a-t-il dans 2 litres et demi?",
      answer: "250cL",
      options: ["25cL", "200cL", "250cL", "500cL"],
      explanation: "2L = 200cL, 0,5L = 50cL, total = 250cL"
    },
    {
      question: "Si un train part à 8h15 et arrive à 12h45, combien de temps dure le trajet?",
      answer: "4h30",
      options: ["3h30", "4h", "4h30", "5h"],
      explanation: "De 8h15 à 12h15 = 4h, plus 30min = 4h30"
    },
    {
      question: "Quelle est la différence entre 2,5kg et 1800g?",
      answer: "700g",
      options: ["300g", "500g", "700g", "800g"],
      explanation: "2,5kg = 2500g, 2500g - 1800g = 700g"
    },
    {
      question: "Si un stylo coûte 1€20 et un crayon 75ct, combien coûtent 3 stylos et 2 crayons?",
      answer: "5€10",
      options: ["3€90", "4€65", "5€10", "6€30"],
      explanation: "(3 × 1€20) + (2 × 75ct) = 3€60 + 1€50 = 5€10"
    },
    {
      question: "Combien de jours y a-t-il du 15 mars au 15 avril (inclus)?",
      answer: "32",
      options: ["30", "31", "32", "33"],
      explanation: "Mars a 31 jours, donc du 15 au 31 mars = 17 jours + 15 jours en avril = 32 jours"
    },
    {
      question: "Si une voiture roule à 60km/h, quelle distance parcourt-elle en 45 minutes?",
      answer: "45km",
      options: ["30km", "45km", "60km", "90km"],
      explanation: "En 1h (60min) elle fait 60km, donc en 45min elle fait 45km"
    },
    {
      question: "Quelle somme fait 5 billets de 10€ + 3 pièces de 2€ + 4 pièces de 50ct?",
      answer: "58€",
      options: ["50€", "56€", "58€", "60€"],
      explanation: "(5 × 10€) + (3 × 2€) + (4 × 0,50€) = 50€ + 6€ + 2€ = 58€"
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
    }, 2000);
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
        maxWidth: "600px",
        width: "100%"
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#D32F2F" }}>Mesures CE1 - Difficile</h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "#D32F2F" }}>Question {currentQuestion + 1}/{questions.length}</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#D32F2F" }}>{questions[currentQuestion].question}</h2>
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px"
          }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                style={{
                  padding: "12px",
                  backgroundColor: 
                    showFeedback 
                      ? option === questions[currentQuestion].answer 
                        ? "#4CAF50" 
                        : option === selectedOption 
                          ? "#F44336" 
                          : "#f5f5f5"
                      : "#f5f5f5",
                  color: 
                    showFeedback && option === questions[currentQuestion].answer 
                      ? "white" 
                      : "black",
                  border: "none",
                  borderRadius: "8px",
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

        {showFeedback && questions[currentQuestion].explanation && (
          <div style={{
            backgroundColor: "#FFCDD2",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "1rem",
            fontSize: "0.9rem"
          }}>
            {questions[currentQuestion].explanation}
          </div>
        )}

        <div style={{ 
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "1.1rem"
        }}>
          <p style={{ color: "#4CAF50" }}>✅: {score.correct}</p>
          <p style={{ color: "#F44336" }}>❌: {score.incorrect}</p>
        </div>
      </div>
    </div>
  );
}