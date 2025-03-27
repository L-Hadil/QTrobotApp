"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function MesuresFacileCP() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "confused" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const questions = [
    {
      question: "Combien de côtés a un carré ?",
      options: ["3", "4", "5"],
      answer: "4",
      image: "/images/carre.png"
    },
    {
      question: "Quelle forme a une balle de football ?",
      options: ["Carré", "Rond", "Triangle"],
      answer: "Rond",
      image: "/images/balle.png"
    },
    {
      question: "Quelle forme a une feuille de papier ?",
      options: ["Rectangle", "Cercle", "Triangle"],
      answer: "Rectangle",
      image: "/images/feuille.png"
    },
    {
      question: "Combien de côtés a un triangle ?",
      options: ["2", "3", "4"],
      answer: "3",
      image: "/images/triangle.png"
    },
    {
      question: "Quelle forme a une pizza ?",
      options: ["Carré", "Rond", "Rectangle"],
      answer: "Rond",
      image: "/images/pizza.png"
    },
    {
      question: "Quelle forme a une porte ?",
      options: ["Rectangle", "Cercle", "Triangle"],
      answer: "Rectangle",
      image: "/images/porte.png"
    },
    {
      question: "Combien de coins a un rectangle ?",
      options: ["2", "4", "6"],
      answer: "4",
      image: "/images/rectangle.png"
    },
    {
      question: "Quelle forme a un ballon de basket ?",
      options: ["Carré", "Rond", "Triangle"],
      answer: "Rond",
      image: "/images/basket.png"
    },
    {
      question: "Quelle forme a un livre ?",
      options: ["Rectangle", "Cercle", "Triangle"],
      answer: "Rectangle",
      image: "/images/livre.png"
    },
    {
      question: "Combien de côtés a un cercle ?",
      options: ["0", "1", "2"],
      answer: "0",
      image: "/images/cercle.png"
    },
    {
      question: "Quelle forme a une fenêtre ?",
      options: ["Carré", "Rond", "Triangle"],
      answer: "Carré",
      image: "/images/fenetre.png"
    },
    {
      question: "Combien de côtés a un losange ?",
      options: ["3", "4", "5"],
      answer: "4",
      image: "/images/losange.png"
    },
    {
      question: "Quelle forme a une roue ?",
      options: ["Carré", "Rond", "Triangle"],
      answer: "Rond",
      image: "/images/roue.png"
    },
    {
      question: "Quelle forme a un tableau noir ?",
      options: ["Rectangle", "Cercle", "Triangle"],
      answer: "Rectangle",
      image: "/images/tableau.png"
    },
    {
      question: "Combien de côtés a un pentagone ?",
      options: ["4", "5", "6"],
      answer: "5",
      image: "/images/pentagone.png"
    },
    {
      question: "Quelle forme a une horloge ?",
      options: ["Carré", "Rond", "Triangle"],
      answer: "Rond",
      image: "/images/horloge.png"
    },
    {
      question: "Quelle forme a une télévision ?",
      options: ["Rectangle", "Cercle", "Triangle"],
      answer: "Rectangle",
      image: "/images/tv.png"
    },
    {
      question: "Combien de côtés a un hexagone ?",
      options: ["5", "6", "7"],
      answer: "6",
      image: "/images/hexagone.png"
    },
    {
      question: "Quelle forme a une assiette ?",
      options: ["Carré", "Rond", "Triangle"],
      answer: "Rond",
      image: "/images/assiette.png"
    },
    {
      question: "Quelle forme a une boîte de céréales ?",
      options: ["Rectangle", "Cercle", "Triangle"],
      answer: "Rectangle",
      image: "/images/boite.png"
    }
  ];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      setCurrentExpression("happy");
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setCurrentExpression("sad");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      }
      setShowResult(false);
      setSelectedAnswer(null);
      setCurrentExpression("neutral");
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
      backgroundColor: "white", // Fond blanc pur
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
        width: "100%",
        border: "2px solid #E0E0E0" // Bordure pour mieux délimiter
      }}>
        {/* Titre avec couleur vive mais lisible */}
        <h1 style={{ 
          fontSize: "1.8rem", 
          marginBottom: "1.5rem", 
          color: "#1976D2", // Bleu vif
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
        }}>
          Mesures - Niveau Facile
        </h1>
        
        {/* Compteur de scores avec meilleur contraste */}
        <div style={{ 
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "1.2rem",
          backgroundColor: "#F5F5F5",
          padding: "10px",
          borderRadius: "10px"
        }}>
          <p style={{ color: "#388E3C", fontWeight: "bold" }}>✅: {score.correct}</p>
          <p style={{ color: "#D32F2F", fontWeight: "bold" }}>❌: {score.incorrect}</p>
          <p style={{ fontWeight: "bold", color: "#5D4037" }}>
            Question {currentQuestion + 1}/{questions.length}
          </p>
        </div>
        
        <div style={{ marginBottom: "2rem" }}>
          {/* Question avec couleur foncée pour bonne lisibilité */}
          <h2 style={{ 
            fontSize: "1.4rem", 
            marginBottom: "1.5rem",
            minHeight: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#212121" // Gris très foncé
          }}>
            {questions[currentQuestion].question}
          </h2>
          
          {/* Feedback avec couleurs vives */}
          {showResult && (
            <div style={{
              margin: "1rem 0",
              padding: "1rem",
              backgroundColor: isCorrect ? "#E8F5E9" : "#FFEBEE",
              borderRadius: "8px",
              border: `2px solid ${isCorrect ? "#388E3C" : "#D32F2F"}`,
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: isCorrect ? "#1B5E20" : "#B71C1C",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              {isCorrect ? "Bravo ! C'est correct !" : `Oups ! La réponse était : ${questions[currentQuestion].answer}`}
            </div>
          )}

          {/* Boutons de réponse avec meilleur contraste */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr", 
            gap: "12px",
            marginTop: "1.5rem"
          }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                style={{
                  padding: "14px",
                  backgroundColor: 
                    showResult
                      ? option === questions[currentQuestion].answer
                        ? "#388E3C" // Vert foncé
                        : option === selectedAnswer
                          ? "#D32F2F" // Rouge foncé
                          : "#EEEEEE" // Gris très clair
                      : selectedAnswer === option
                        ? "#BBDEFB" // Bleu clair
                        : "#E3F2FD", // Bleu très clair
                  color: 
                    showResult && option === questions[currentQuestion].answer
                      ? "white"
                      : "#212121", // Texte toujours foncé
                  border: "2px solid",
                  borderColor: 
                    showResult
                      ? option === questions[currentQuestion].answer
                        ? "#2E7D32"
                        : option === selectedAnswer
                          ? "#C62828"
                          : "#E0E0E0"
                      : selectedAnswer === option
                        ? "#2196F3"
                        : "#BDBDBD",
                  borderRadius: "10px",
                  cursor: showResult ? "default" : "pointer",
                  transition: "all 0.2s",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  ":hover": {
                    transform: !showResult ? "scale(1.02)" : "scale(1)"
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Résultat final avec contraste amélioré */}
        {currentQuestion === questions.length - 1 && showResult && (
          <div style={{
            marginTop: "2rem",
            padding: "1.5rem",
            backgroundColor: "#E1F5FE", // Bleu très clair
            borderRadius: "12px",
            fontSize: "1.3rem",
            border: "3px solid #0288D1", // Bordure bleue
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ 
              fontSize: "1.6rem",
              color: "#01579B", // Bleu foncé
              marginBottom: "1rem",
              fontWeight: "bold"
            }}>
              Félicitations ! 
            </h3>
            <p style={{ 
              fontSize: "1.4rem", 
              fontWeight: "bold",
              color: "#212121"
            }}>
              Score final: <span style={{ color: "#388E3C" }}>{score.correct}</span> / {questions.length}
            </p>
            <p style={{ 
              marginTop: "1rem", 
              fontSize: "1.2rem",
              color: "#424242"
            }}>
              {score.correct === questions.length
                ? "Parfait ! Tu es un champion des formes géométriques !"
                : score.correct >= questions.length / 2
                ? "Excellent travail ! Continue comme ça !"
                : "Bon début ! À toi de jouer pour t'améliorer !"}
            </p>
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setScore({ correct: 0, incorrect: 0 });
                setShowResult(false);
                setSelectedAnswer(null);
                setCurrentExpression("neutral");
              }}
              style={{
                marginTop: "1.5rem",
                padding: "12px 24px",
                backgroundColor: "#0288D1",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1.1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                ":hover": {
                  backgroundColor: "#0277BD"
                }
              }}
            >
              Recommencer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}