"use client";
import { useSpeech } from "@/app/hooks/useSpeech";
import { useEffect } from "react";
import { saveActivityToSession } from "@/app/utils/sessionUtils";


import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";

export default function GeometrieDifficilePage() {
 
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentExpression, setCurrentExpression] = useState<"happy" | "sad" | "neutral" | "talking">("neutral");
  const { speak } = useSpeech();
  useEffect(() => {
    localStorage.setItem("niveau", "CP"); 
    localStorage.setItem("categorie", "Géométrie");
    localStorage.setItem("difficulte", "Difficile"); 
  }, []);
  useEffect(() => {
    speak(
      questions[currentQuestion].question,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [currentQuestion]);
  
  const questions = [
    {
      question: "Quelle est la différence entre un carré et un rectangle ?",
      options: [
        "Un carré a 4 côtés égaux, un rectangle non",
        "Un rectangle a 4 angles droits, un carré non",
        "Ils sont identiques"
      ],
      answer: "Un carré a 4 côtés égaux, un rectangle non",
      image: "/images/carre-rectangle.png"
    },
    {
      question: "Combien de sommets a un cube ?",
      options: ["4", "6", "8"],
      answer: "8",
      image: "/images/cube.png"
    },
    {
      question: "Quelle forme a une base circulaire et un sommet ?",
      options: ["Cône", "Cube", "Pyramide"],
      answer: "Cône",
      image: "/images/cone.png"
    },
    {
      question: "Combien de faces a une pyramide à base carrée ?",
      options: ["4", "5", "6"],
      answer: "5",
      image: "/images/pyramide.png"
    },
    {
      question: "Quelle forme a 6 faces carrées identiques ?",
      options: ["Cube", "Sphère", "Pyramide"],
      answer: "Cube",
      image: "/images/cube.png"
    },
    {
      question: "Quelle forme est un polygone à 7 côtés ?",
      options: ["Hexagone", "Heptagone", "Octogone"],
      answer: "Heptagone",
      image: "/images/heptagone.png"
    },
    {
      question: "Quelle forme a des faces triangulaires et une base carrée ?",
      options: ["Cube", "Pyramide", "Cône"],
      answer: "Pyramide",
      image: "/images/pyramide.png"
    },
    {
      question: "Quelle est la particularité d'un losange ?",
      options: [
        "4 côtés égaux mais pas d'angles droits",
        "4 angles droits mais pas de côtés égaux",
        "3 côtés égaux"
      ],
      answer: "4 côtés égaux mais pas d'angles droits",
      image: "/images/losange.png"
    },
    {
      question: "Quelle forme a une surface courbe et aucun côté ?",
      options: ["Sphère", "Cube", "Pyramide"],
      answer: "Sphère",
      image: "/images/sphere.png"
    },
    {
      question: "Combien d'arêtes a un cube ?",
      options: ["8", "12", "6"],
      answer: "12",
      image: "/images/cube-arêtes.png"
    },
    {
      question: "Quelle forme a une base et un sommet reliés par des faces triangulaires ?",
      options: ["Cône", "Pyramide", "Cube"],
      answer: "Pyramide",
      image: "/images/pyramide.png"
    },
    {
      question: "Quelle est la différence entre un cercle et une sphère ?",
      options: [
        "Un cercle est en 2D, une sphère en 3D",
        "Une sphère est en 2D, un cercle en 3D",
        "Ils sont identiques"
      ],
      answer: "Un cercle est en 2D, une sphère en 3D",
      image: "/images/cercle-sphere.png"
    },
    {
      question: "Combien de faces a un cylindre ?",
      options: ["2", "3", "4"],
      answer: "3",
      image: "/images/cylindre.png"
    },
    {
      question: "Quelle forme a des faces rectangulaires et deux bases circulaires ?",
      options: ["Cylindre", "Cône", "Pyramide"],
      answer: "Cylindre",
      image: "/images/cylindre.png"
    },
    {
      question: "Quelle est la particularité d'un trapèze ?",
      options: [
        "4 côtés dont 2 parallèles",
        "3 côtés égaux",
        "4 côtés égaux"
      ],
      answer: "4 côtés dont 2 parallèles",
      image: "/images/trapeze.png"
    },
    {
      question: "Combien de diagonales a un pentagone ?",
      options: ["3", "5", "7"],
      answer: "5",
      image: "/images/pentagone-diagonales.png"
    },
    {
      question: "Quelle forme a des faces carrées et des faces triangulaires ?",
      options: ["Pyramide", "Cube", "Prisme"],
      answer: "Pyramide",
      image: "/images/pyramide.png"
    },
    {
      question: "Quelle est la différence entre un polygone régulier et irrégulier ?",
      options: [
        "Régulier a tous côtés et angles égaux",
        "Irregulier a tous côtés et angles égaux",
        "Aucune différence"
      ],
      answer: "Régulier a tous côtés et angles égaux",
      image: "/images/polygones.png"
    },
    {
      question: "Combien de faces a un prisme triangulaire ?",
      options: ["4", "5", "6"],
      answer: "5",
      image: "/images/prisme-triangulaire.png"
    },
    {
      question: "Quelle forme a une base carrée et des faces triangulaires ?",
      options: ["Cube", "Pyramide carrée", "Prisme carré"],
      answer: "Pyramide carrée",
      image: "/images/pyramide-carree.png"
    }
  ];
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setShowResult(true);
  
    if (correct) {
      const newCorrect = score.correct + 1;
      setScore(prev => ({ ...prev, correct: newCorrect }));
      localStorage.setItem("correct", newCorrect.toString());
      setCurrentExpression("happy");
  
      // ✅ Enregistrer la bonne réponse dans MongoDB
      saveActivityToSession({
        correct: 1,
        incorrect: 0,
      });
  
    } else {
      const newIncorrect = score.incorrect + 1;
      setScore(prev => ({ ...prev, incorrect: newIncorrect }));
      localStorage.setItem("incorrect", newIncorrect.toString());
      setCurrentExpression("sad");
  
      // ❌ Enregistrer la mauvaise réponse dans MongoDB
      saveActivityToSession({
        correct: 0,
        incorrect: 1,
      });
    }
  
    // Passer à la prochaine question après un délai
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
        border: "2px solid #E0E0E0" 
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