"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function MesuresMoyenCP() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "confused" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "Combien de centimètres y a-t-il dans un mètre?",
      answer: "100",
      options: ["10", "50", "100"]
    },
    {
      question: "Si tu mesures un crayon, quelle unité utilises-tu?",
      answer: "centimètres",
      options: ["mètres", "centimètres", "kilomètres"]
    },
    {
      question: "Quelle heure est-il quand la petite aiguille est entre le 3 et le 4 et la grande sur le 6?",
      answer: "3h30",
      options: ["3h00", "3h30", "4h30"]
    },
    {
      question: "Combien de mois y a-t-il dans une année?",
      answer: "12",
      options: ["6", "12", "24"]
    },
    {
      question: "Quelle quantité est la plus grande? (25cl/50cl/75cl)",
      answer: "75cl",
      options: ["25cl", "50cl", "75cl"]
    },
    {
      question: "Quelle quantité est la plus petite? (100g/500g/1kg)",
      answer: "100g",
      options: ["100g", "500g", "1kg"]
    },
    {
      question: "Si un verre contient 20cl, combien en contiennent 3 verres?",
      answer: "60cl",
      options: ["20cl", "40cl", "60cl"]
    },
    {
      question: "Quelle température est normale pour le corps humain?",
      answer: "37°C",
      options: ["0°C", "37°C", "100°C"]
    },
    {
      question: "Combien de jours y a-t-il en avril?",
      answer: "30",
      options: ["28", "30", "31"]
    },
    {
      question: "Quelle somme fait 1€ + 50ct + 20ct?",
      answer: "1€70",
      options: ["1€50", "1€70", "2€"]
    },
    {
      question: "Si un sac pèse 3kg et un autre 5kg, quel est le poids total?",
      answer: "8kg",
      options: ["2kg", "8kg", "15kg"]
    },
    {
      question: "Quelle est la durée d'une récréation typique?",
      answer: "15 minutes",
      options: ["5 minutes", "15 minutes", "1 heure"]
    },
    {
      question: "Si tu pars à 14h et reviens à 15h30, combien de temps es-tu parti?",
      answer: "1h30",
      options: ["30 minutes", "1h00", "1h30"]
    },
    {
      question: "Quelle est la saison entre l'hiver et l'été?",
      answer: "printemps",
      options: ["automne", "printemps", "été"]
    },
    {
      question: "Combien de semaines y a-t-il dans un mois?",
      answer: "4",
      options: ["2", "4", "6"]
    },
    {
      question: "Quelle est la valeur de 2 billets de 5€ + 3 pièces de 2€?",
      answer: "16€",
      options: ["10€", "16€", "20€"]
    },
    {
      question: "Si un litre de jus coûte 2€, combien coûtent 3 litres?",
      answer: "6€",
      options: ["2€", "5€", "6€"]
    },
    {
      question: "Quelle est la température quand l'eau gèle?",
      answer: "0°C",
      options: ["0°C", "10°C", "100°C"]
    },
    {
      question: "Combien de secondes y a-t-il dans une minute?",
      answer: "60",
      options: ["30", "60", "100"]
    },
    {
      question: "Si un film dure 1h45, combien de minutes cela fait-il?",
      answer: "105",
      options: ["45", "100", "105"]
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
      backgroundColor: "#fff8e1",
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#ff9800" }}>Mesures - Niveau Moyen</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#ff9800" }}>Question {currentQuestion + 1}/20</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#ff9800" }}>{questions[currentQuestion].question}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                style={{
                  padding: "10px",
                  backgroundColor: 
                    showFeedback 
                      ? option === questions[currentQuestion].answer 
                        ? "#4CAF50" 
                        : option === selectedOption 
                          ? "#F44336" 
                          : "#f0f0f0"
                      : "#f0f0f0",
                  color: 
                    showFeedback && option === questions[currentQuestion].answer 
                      ? "white" 
                      : "black",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "1.1rem"
        }}>
          <p style={{ color: "#4CAF50" }}>Bonnes réponses: {score.correct}</p>
          <p style={{ color: "#F44336" }}>Mauvaises réponses: {score.incorrect}</p>
        </div>
      </div>
    </div>
  );
}