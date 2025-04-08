"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { useEffect } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
export default function MesuresMoyenCE1() {
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
      question: "Combien de décimètres y a-t-il dans un mètre?",
      answer: "10",
      options: ["5", "10", "100", "1000"],
      explanation: "1 mètre = 10 décimètres"
    },
    {
      question: "Quelle heure est-il quand la petite aiguille est entre le 4 et le 5 et la grande sur le 6?",
      answer: "4h30",
      options: ["4h06", "4h30", "5h30", "6h20"],
      image: "/images/horloge.png"
    },
    {
      question: "Si un livre coûte 6€ et que tu donnes 10€, combien te rendra-t-on?",
      answer: "4€",
      options: ["2€", "4€", "6€", "16€"],
      explanation: "10€ - 6€ = 4€"
    },
    {
      question: "Quelle est la différence entre 1m et 65cm?",
      answer: "35cm",
      options: ["25cm", "35cm", "45cm", "165cm"],
      explanation: "1m = 100cm, 100cm - 65cm = 35cm"
    },
    {
      question: "Combien de minutes y a-t-il dans 2 heures?",
      answer: "120",
      options: ["60", "90", "120", "200"]
    },
    {
      question: "Si une règle mesure 30cm, combien mesurent 2 règles mises bout à bout?",
      answer: "60cm",
      options: ["30cm", "60cm", "90cm", "120cm"]
    },
    {
      question: "Quelle température fait-il quand l'eau gèle?",
      answer: "0°C",
      options: ["-10°C", "0°C", "10°C", "20°C"]
    },
    {
      question: "Combien de centilitres y a-t-il dans un demi-litre?",
      answer: "50cL",
      options: ["25cL", "50cL", "75cL", "100cL"],
      explanation: "1L = 100cL, donc 0,5L = 50cL"
    },
    {
      question: "Si un film commence à 14h15 et dure 1h45, à quelle heure se termine-t-il?",
      answer: "16h00",
      options: ["15h00", "15h30", "16h00", "16h30"]
    },
    {
      question: "Quelle somme fait 3 pièces de 20ct + 2 pièces de 50ct?",
      answer: "1€60",
      options: ["1€", "1€60", "2€", "2€50"],
      explanation: "(3 × 20ct) + (2 × 50ct) = 60ct + 100ct = 160ct = 1€60"
    },
    {
      question: "Quelle distance est la plus longue? 500m ou 0,5km?",
      answer: "0,5km",
      options: ["500m", "0,5km"],
      explanation: "0,5km = 500m donc c'est pareil"
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#FFA000" }}>Mesures CE1 - Moyen</h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "#FFA000" }}>Question {currentQuestion + 1}/{questions.length}</p>
        
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
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#FFA000" }}>{questions[currentQuestion].question}</h2>
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
            backgroundColor: "#FFF3E0",
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