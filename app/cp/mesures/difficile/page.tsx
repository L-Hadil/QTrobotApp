"use client";

import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import QTRobot from "@/app/components/QTRobot";


export default function MesuresDifficileCP() {
  
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentExpression, setCurrentExpression] = useState<"happy" | "sad" | "neutral" | "talking">("neutral");
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
      question: "Combien de mètres y a-t-il dans un kilomètre?",
      answer: "1000",
      options: ["10", "100", "1000"]
    },
    {
      question: "Si un paquet pèse 250g, combien pèsent 4 paquets?",
      answer: "1kg",
      options: ["500g", "750g", "1kg"]
    },
    {
      question: "Quelle heure est-il quand la petite aiguelle est sur le 4 et la grande sur le 9?",
      answer: "4h45",
      options: ["4h00", "4h45", "5h45"]
    },
    {
      question: "Si une bouteille contient 75cl, combien en manque-t-il pour faire 1 litre?",
      answer: "25cl",
      options: ["10cl", "25cl", "50cl"]
    },
    {
      question: "Combien de trimestres y a-t-il dans une année?",
      answer: "4",
      options: ["2", "4", "6"]
    },
    {
      question: "Quelle somme fait 2€ + 50ct + 3 pièces de 20ct?",
      answer: "3€10",
      options: ["2€70", "3€10", "3€50"]
    },
    {
      question: "Si un train part à 8h15 et arrive à 10h30, combien de temps dure le trajet?",
      answer: "2h15",
      options: ["1h15", "2h15", "3h15"]
    },
    {
      question: "Quelle température fait-il quand il neige?",
      answer: "0°C",
      options: ["-10°C", "0°C", "10°C"]
    },
    {
      question: "Combien de jours y a-t-il dans un semestre?",
      answer: "180",
      options: ["30", "90", "180"]
    },
    {
      question: "Si un mètre de tissu coûte 5€, combien coûtent 2,5 mètres?",
      answer: "12€50",
      options: ["7€50", "10€", "12€50"]
    },
    {
      question: "Quelle est la différence entre 1kg et 750g?",
      answer: "250g",
      options: ["150g", "250g", "500g"]
    },
    {
      question: "Si tu marches 30 minutes par jour, combien de minutes marches-tu en une semaine?",
      answer: "210",
      options: ["90", "180", "210"]
    },
    {
      question: "Quelle est la valeur de 3 billets de 10€ + 2 pièces de 2€?",
      answer: "34€",
      options: ["30€", "34€", "40€"]
    },
    {
      question: "Si un verre contient 15cl, combien de verres peut-on remplir avec 1 litre?",
      answer: "6",
      options: ["4", "6", "8"]
    },
    {
      question: "Combien de minutes y a-t-il dans 2 heures et demie?",
      answer: "150",
      options: ["120", "150", "180"]
    },
    {
      question: "Quelle est la température de l'eau qui bout?",
      answer: "100°C",
      options: ["50°C", "75°C", "100°C"]
    },
    {
      question: "Si un livre coûte 6€50, combien coûtent 3 livres?",
      answer: "19€50",
      options: ["12€", "18€", "19€50"]
    },
    {
      question: "Combien de semaines y a-t-il dans un trimestre?",
      answer: "13",
      options: ["4", "12", "13"]
    },
    {
      question: "Quelle est la différence entre 1m et 65cm?",
      answer: "35cm",
      options: ["25cm", "35cm", "45cm"]
    },
    {
      question: "Si un cours dure 45 minutes, combien de cours peut-on faire en 3 heures?",
      answer: "4",
      options: ["3", "4", "5"]
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#f44336" }}>Mesures - Niveau Difficile</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#f44336" }}>Question {currentQuestion + 1}/20</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#f44336" }}>{questions[currentQuestion].question}</h2>
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