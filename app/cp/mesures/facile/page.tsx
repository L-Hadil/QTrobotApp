"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function MesuresFacileCP() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "confused" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "Quel objet est le plus léger? (pomme/ballon/voiture)",
      answer: "pomme",
      options: ["pomme", "ballon", "voiture"]
    },
    {
      question: "Quel objet est le plus lourd? (plume/livre/éléphant)",
      answer: "éléphant",
      options: ["plume", "livre", "éléphant"]
    },
    {
      question: "Quel animal est le plus petit? (souris/chien/girafe)",
      answer: "souris",
      options: ["souris", "chien", "girafe"]
    },
    {
      question: "Quelle boîte contient le plus? (boîte pleine/boîte à moitié pleine/boîte vide)",
      answer: "boîte pleine",
      options: ["boîte pleine", "boîte à moitié pleine", "boîte vide"]
    },
    {
      question: "Quelle bouteille contient le moins d'eau? (pleine/à moitié pleine/vide)",
      answer: "vide",
      options: ["pleine", "à moitié pleine", "vide"]
    },
    {
      question: "Quel objet mesure environ 1 cm? (graine/stylo/table)",
      answer: "graine",
      options: ["graine", "stylo", "table"]
    },
    {
      question: "Quel objet mesure environ 1 mètre? (crayon/chaise/immeuble)",
      answer: "chaise",
      options: ["crayon", "chaise", "immeuble"]
    },
    {
      question: "Quelle heure est-il quand la petite aiguille est sur le 3 et la grande sur le 12?",
      answer: "3 heures",
      options: ["1 heure", "3 heures", "12 heures"]
    },
    {
      question: "Combien y a-t-il de jours dans une semaine?",
      answer: "7",
      options: ["5", "6", "7"]
    },
    {
      question: "Quelle est la saison la plus froide?",
      answer: "hiver",
      options: ["printemps", "été", "hiver"]
    },
    {
      question: "Quelle pièce de monnaie vaut le plus? (1 centime/10 centimes/1 euro)",
      answer: "1 euro",
      options: ["1 centime", "10 centimes", "1 euro"]
    },
    {
      question: "Quelle pièce de monnaie vaut le moins? (1 centime/10 centimes/1 euro)",
      answer: "1 centime",
      options: ["1 centime", "10 centimes", "1 euro"]
    },
    {
      question: "Quel objet pèse environ 1 kg? (clou/livre/sac de farine)",
      answer: "sac de farine",
      options: ["clou", "livre", "sac de farine"]
    },
    {
      question: "Quel contenant peut tenir 1 litre? (verre/bouteille/baignoire)",
      answer: "bouteille",
      options: ["verre", "bouteille", "baignoire"]
    },
    {
      question: "Quel mois vient après juin?",
      answer: "juillet",
      options: ["mai", "juillet", "août"]
    },
    {
      question: "Combien de minutes y a-t-il dans une heure?",
      answer: "60",
      options: ["30", "60", "100"]
    },
    {
      question: "Quelle température est la plus froide? (0°C/10°C/20°C)",
      answer: "0°C",
      options: ["0°C", "10°C", "20°C"]
    },
    {
      question: "Quel jour vient après mardi?",
      answer: "mercredi",
      options: ["lundi", "mercredi", "vendredi"]
    },
    {
      question: "Quelle est la première saison de l'année?",
      answer: "printemps",
      options: ["printemps", "été", "automne"]
    },
    {
      question: "Quelle est la durée d'une journée complète?",
      answer: "24 heures",
      options: ["12 heures", "24 heures", "30 heures"]
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
      backgroundColor: "#f0f8ff",
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#4a6fa5" }}>Mesures - Niveau Facile</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#4a6fa5" }}>Question {currentQuestion + 1}/20</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#4a6fa5" }}>{questions[currentQuestion].question}</h2>
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