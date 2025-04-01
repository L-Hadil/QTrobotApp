"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function MesuresFacileCE1() {
  const [currentExpression, setCurrentExpression] = useState("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "Quelle unité utiliserais-tu pour mesurer un crayon?",
      answer: "cm",
      options: ["mm", "cm", "m", "km"],
      image: "/images/crayon.png"
    },
    {
      question: "Combien y a-t-il de centimètres dans un décimètre?",
      answer: "10",
      options: ["5", "10", "100", "1000"]
    },
    {
      question: "Quelle heure est-il quand la petite aiguille est sur le 3 et la grande sur le 12?",
      answer: "3h00",
      options: ["3h00", "3h12", "12h03", "12h30"],
    },
    {
      question: "Quel instrument utiliserais-tu pour mesurer une table?",
      answer: "mètre ruban",
      options: ["balance", "thermomètre", "mètre ruban", "verre mesureur"]
    },
    {
      question: "Si un stylo coûte 2€ et un cahier 3€, combien coûtent-ils ensemble?",
      answer: "5€",
      options: ["4€", "5€", "6€", "7€"]
    },
    {
      question: "Quelle est la température normale du corps humain?",
      answer: "37°C",
      options: ["0°C", "20°C", "37°C", "100°C"]
    },
    {
      question: "Combien de jours y a-t-il dans une semaine?",
      answer: "7",
      options: ["5", "6", "7", "8"]
    },
    {
      question: "Quelle quantité est la plus grande? 1L ou 50cL?",
      answer: "1L",
      options: ["1L", "50cL"],
      explanation: "1L = 100cL donc c'est plus que 50cL"
    },
    {
      question: "Quelle pièce de monnaie vaut le plus?",
      answer: "2€",
      options: ["1ct", "10ct", "50ct", "2€"]
    },
    {
      question: "Si tu pars à 14h et reviens à 15h30, combien de temps es-tu parti?",
      answer: "1h30",
      options: ["30min", "1h", "1h30", "2h"]
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#4CAF50" }}>Mesures CE1 - Facile</h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "#4CAF50" }}>Question {currentQuestion + 1}/{questions.length}</p>
        
        {questions[currentQuestion].image && (
          <img 
            src={questions[currentQuestion].image} 
            alt="Illustration" 
            style={{ 
              maxWidth: "200px", 
              margin: "0 auto 1rem",
              border: "2px solid #BDBDBD",
              borderRadius: "8px"
            }} 
          />
        )}

        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#4CAF50" }}>{questions[currentQuestion].question}</h2>
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
            backgroundColor: "#E3F2FD",
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