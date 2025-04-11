"use client";

import { useState } from "react";
import QTRobot from "@/app/components/QTRobot";
import { useEffect } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import { saveActivityToSession } from "@/app/utils/sessionUtils";


export default function GeometrieDifficileCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" |"talking" |"sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { speak } = useSpeech();
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    localStorage.setItem("niveau", "CE1");
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
      question: "Quel solide a exactement 5 sommets et 5 faces?",
      image: "/images/solides.png",
      answer: "pyramide à base carrée",
      options: ["cube", "pyramide à base carrée", "prisme triangulaire"]
    },
    {
      question: "Combien de faces a un cylindre?",
      image: "/images/solides.png",
      answer: "3",
      options: ["1", "2", "3"]
    },
    {
      question: "Quelle figure montre une symétrie par rapport à deux droites?",
      image: "/images/symetrie-difficile.png",
      answer: "C",
      options: ["A", "B", "C"]
    },
    {
      question: "Quel chemin permet d'aller de A1 à E5 en passant par C3?",
      image: "/images/grid.png",
      answer: "B2, C3, D4",
      options: ["D4", "B2, C3, D4", "B1, C2, D3"]
    },
    {
      question: "Comment appel ton un solide qui n’a que des faces planes. Il ne peut pas rouler.",
      answer: "Polyèdre",
      options: ["Polytopes", "Polygones", "Polyèdre"]
    },
    {
      question: "Quel solide peut être obtenu en assemblant deux pyramides à base carrée?",
      answer: "octaèdre",
      options: ["cube", "prisme", "octaèdre"]
    },
    {
      question: "Combien de droites de symétrie a un rectangle?",
      image: "/images/rectangle.png",
      answer: "2",
      options: ["1", "2", "4"]
    },
    {
      question: "Quelle est la case symétrique de B4 par rapport à la diagonale?",
      image: "/images/grid.png",
      answer: "D2",
      options: ["A1", "D2", "E5"]
    },
    {
      question: "Quel solide a le plus d'arêtes?",
      image: "/images/solides.png",
      answer: "pavé",
      options: ["cube", "pavé", "pyramide"]
    },
    {
      question: "Comment décrire le déplacement de A1 à C3 puis à E1?",
      image: "/images/grid.png",
      answer: "B2 puis D2",
      options: [
        "B2 puis D2",
        "B1+C1 puis D1+D2",
        "A2+B2 puis D2+E3"
      ]
    }
  ];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = async (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
  
    const isAnswerCorrect = option === questions[currentQuestion].answer;
    setIsCorrect(isAnswerCorrect);
  
    if (isAnswerCorrect) {
      const newCorrect = score.correct + 1;
      setScore((prev) => ({ ...prev, correct: newCorrect }));
      setCurrentExpression("happy");
  
      await saveActivityToSession({
        correct: newCorrect,
        incorrect: score.incorrect,
      });
    } else {
      const newIncorrect = score.incorrect + 1;
      setScore((prev) => ({ ...prev, incorrect: newIncorrect }));
      setCurrentExpression("sad");
  
      await saveActivityToSession({
        correct: score.correct,
        incorrect: newIncorrect,
      });
    }
  
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#f44336" }}>Géométrie CE1 - Niveau Difficile</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#f44336" }}>Question {currentQuestion + 1}/10</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#f44336" }}>{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].image && (
            <img 
              src={questions[currentQuestion].image} 
              alt="Illustration" 
              style={{ 
                maxWidth: "300px", 
                margin: "0 auto 1rem", 
                border: "1px solid #ddd",
                borderRadius: "8px"
              }} 
            />
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
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
                  transition: "all 0.3s",
                  fontSize: "1rem"
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