"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { useSpeech } from "@/app/hooks/useSpeech";
import { useEffect } from "react";


export default function GeometrieMoyenPage() {
  
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
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
      question: "Quelle forme a 4 côtés égaux et 4 angles droits ?",
      options: ["Triangle", "Carré", "Cercle"],
      answer: "Carré",
      image: "/images/carre.png"
    },
    {
      question: "Quelle forme a 3 côtés ?",
      options: ["Rectangle", "Triangle", "Pentagone"],
      answer: "Triangle",
      image: "/images/triangle.png"
    },
    {
      question: "Quelle forme n'a pas de côtés ?",
      options: ["Carré", "Triangle", "Cercle"],
      answer: "Cercle",
      image: "/images/cercle.png"
    },
    {
      question: "Combien de côtés a un rectangle ?",
      options: ["3", "4", "5"],
      answer: "4",
      image: "/images/rectangle.png"
    },
    {
      question: "Quelle forme a tous ses côtés de longueurs différentes ?",
      options: ["Carré", "Triangle scalène", "Rectangle"],
      answer: "Triangle scalène",
      image: "/images/triangle-scalene.png"
    },
    {
      question: "Quelle forme a 5 côtés ?",
      options: ["Pentagone", "Hexagone", "Carré"],
      answer: "Pentagone",
      image: "/images/pentagone.png"
    },
    {
      question: "Quelle forme a 6 côtés ?",
      options: ["Pentagone", "Hexagone", "Octogone"],
      answer: "Hexagone",
      image: "/images/hexagone.png"
    },
    {
      question: "Quelle forme a des côtés opposés parallèles ?",
      options: ["Triangle", "Cercle", "Rectangle"],
      answer: "Rectangle",
      image: "/images/rectangle.png"
    },
    {
      question: "Quelle forme a 4 côtés mais pas tous égaux ?",
      options: ["Carré", "Rectangle", "Triangle"],
      answer: "Rectangle",
      image: "/images/rectangle.png"
    },
    {
      question: "Quelle forme a 3 côtés égaux ?",
      options: ["Triangle équilatéral", "Triangle isocèle", "Triangle scalène"],
      answer: "Triangle équilatéral",
      image: "/images/triangle-equilateral.png"
    },
    {
      question: "Quelle forme a 2 côtés égaux ?",
      options: ["Triangle équilatéral", "Triangle isocèle", "Triangle scalène"],
      answer: "Triangle isocèle",
      image: "/images/triangle-isocèle.png"
    },
    {
      question: "Quelle forme peut rouler ?",
      options: ["Carré", "Triangle", "Cercle"],
      answer: "Cercle",
      image: "/images/cercle.png"
    },
    {
      question: "Quelle forme a des côtés qui se croisent ?",
      options: ["Étoile", "Carré", "Rectangle"],
      answer: "Étoile",
      image: "/images/etoile.png"
    },
    {
      question: "Quelle forme a 8 côtés ?",
      options: ["Hexagone", "Heptagone", "Octogone"],
      answer: "Octogone",
      image: "/images/octogone.png"
    },
    {
      question: "Quelle forme est plate et peut être pliée en deux ?",
      options: ["Sphère", "Cube", "Triangle"],
      answer: "Triangle",
      image: "/images/triangle.png"
    },
    {
      question: "Quelle forme a des côtés qui ne sont pas droits ?",
      options: ["Ovale", "Carré", "Rectangle"],
      answer: "Ovale",
      image: "/images/ovale.png"
    },
    {
      question: "Quelle forme a des côtés courbés vers l'extérieur ?",
      options: ["Cercle", "Étoile", "Triangle"],
      answer: "Étoile",
      image: "/images/etoile.png"
    },
    {
      question: "Quelle forme a des côtés courbés vers l'intérieur ?",
      options: ["Lune", "Carré", "Triangle"],
      answer: "Lune",
      image: "/images/lune.png"
    },
    {
      question: "Quelle forme a des angles obtus ?",
      options: ["Triangle rectangle", "Triangle obtusangle", "Triangle acutangle"],
      answer: "Triangle obtusangle",
      image: "/images/triangle-obtus.png"
    },
    {
      question: "Quelle forme a tous ses angles aigus ?",
      options: ["Triangle rectangle", "Triangle obtusangle", "Triangle acutangle"],
      answer: "Triangle acutangle",
      image: "/images/triangle-acutangle.png"
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