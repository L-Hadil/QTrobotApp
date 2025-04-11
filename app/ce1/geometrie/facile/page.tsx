"use client";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import QTRobot from "@/app/components/QTRobot";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GeometrieFacileCE1() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "talking" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [startTime] = useState(Date.now());
  const { speak } = useSpeech();
  const router = useRouter();

  // Load child data from localStorage
  useEffect(() => {
    setChildName(localStorage.getItem("prenom") || "Anonyme");
    setChildAge(localStorage.getItem("age") || "Inconnu");
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
      question: "Quelle forme est un cube?",
      image: "/images/cube.png",
      answer: "cube",
      options: ["cube", "boule", "pyramide"],
      explanation: "Un cube a 6 faces carrées identiques"
    },
    {
      question: "Quelle forme est ronde comme un ballon?",
      image: "/images/balle.png",
      answer: "boule",
      options: ["cube", "boule", "cylindre"],
      explanation: "Une boule est parfaitement ronde dans toutes les directions"
    },
    {
      question: "Quelle forme a 6 faces carrées identiques?",
      answer: "cube",
      options: ["cube", "pyramide", "cylindre"],
      explanation: "Un cube a toujours 6 faces carrées identiques"
    },
    {
      question: "Quelle forme ressemble à une boîte de céréales?",
      image: "/images/boite.png",
      answer: "pavé droit",
      options: ["cube", "pavé droit", "cône"],
      explanation: "Un pavé droit a des faces rectangulaires comme une boîte de céréales"
    },
    {
      question: "Quelle forme ressemble à un glace cornet?",
      image: "/images/cone.png",
      answer: "cône",
      options: ["pyramide", "cône", "cylindre"],
      explanation: "Un cône a une base ronde et un sommet pointu comme une glace cornet"
    },
    {
      question: "Quelle forme peut rouler?",
      image: "/images/balle.png",
      answer: "boule",
      options: ["cube", "boule", "pyramide"],
      explanation: "Une boule peut rouler car elle n'a pas d'arêtes"
    },
    {
      question: "Où est la droite symétrique dans cette figure?",
      image: "/images/symetrie-facile.png",
      answer: "verticale",
      options: ["horizontale", "verticale", "diagonale"],
      explanation: "La ligne verticale divise la figure en deux parties identiques"
    },
    {
      question: "Quelle partie manque pour compléter la figure symétrique?",
      image: "/images/symetrie-partie-manquante.png",
      answer: "triangle",
      options: ["carré", "triangle", "rond"],
      explanation: "Le triangle manquant complète la symétrie de l'autre côté"
    },
    {
      question: "Quelle case est à gauche de la case B3?",
      image: "/images/grid.png",
      answer: "A3",
      options: ["A3", "B2", "C3"],
      explanation: "A3 est directement à gauche de B3 dans la grille"
    },
    {
      question: "Comment se déplacer de A1 à C1?",
      image: "/images/grid.png",
      answer: "2 cases vers la droite",
      options: ["2 cases vers le bas", "2 cases vers la droite", "1 case en diagonale"],
      explanation: "De A1 à C1, on se déplace horizontalement vers la droite"
    }
  ];

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
    
    const isCorrect = option === questions[currentQuestion].answer;
    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
    }));
    setCurrentExpression(isCorrect ? "happy" : "sad");

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowFeedback(false);
        setCurrentExpression("neutral");
      } else {
        saveResults();
      }
    }, 1500);
  };

  const saveResults = () => {
    const endTime = Date.now();
    const timeSpentSeconds = Math.round((endTime - startTime) / 1000);

    const results = {
      name: childName,
      age: childAge,
      niveau: localStorage.getItem("niveau") || "CE1",
      exercise: "Géométrie Facile",
      totalQuestions: questions.length,
      correctAnswers: score.correct,
      incorrectAnswers: score.incorrect,
      timeSpent: timeSpentSeconds,
      completionDate: new Date().toISOString(),
      details: questions.map((q, i) => ({
        problem: q.question,
        userAnswer: i === currentQuestion ? selectedOption : "N/A",
        correctAnswer: q.answer,
        isCorrect: i === currentQuestion ? selectedOption === q.answer : false,
        explanation: q.explanation || ""
      }))
    };

    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem("mathResults") || "[]");
    localStorage.setItem("mathResults", JSON.stringify([...existingData, results]));

    // Redirect to recap page
    router.push(`/recap?name=${encodeURIComponent(childName)}&age=${childAge}&correct=${score.correct}&total=${questions.length}&time=${timeSpentSeconds}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
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
      {/* Child info display */}
      <div style={{
        position: "absolute",
        top: "10px",
        left: "20px",
        fontSize: "1rem",
        color: "#555",
        background: "rgba(255,255,255,0.8)",
        padding: "6px 12px",
        borderRadius: "8px"
      }}>
        {childName} ({childAge} ans)
      </div>

      {/* Timer display */}
      <div style={{ 
        position: "absolute", 
        top: "10px", 
        right: "20px", 
        fontSize: "1rem", 
        color: "#555", 
        background: "rgba(255,255,255,0.8)", 
        padding: "6px 12px", 
        borderRadius: "8px" 
      }}>
        ⏱ Temps passé : {formatTime(Math.round((Date.now() - startTime) / 1000))}
      </div>

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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#4caf50" }}>Géométrie CE1 - Niveau Facile</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#4caf50" }}>Question {currentQuestion + 1}/{questions.length}</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#4caf50" }}>{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].image && (
            <Image 
              src={questions[currentQuestion].image} 
              alt="Illustration" 
              width={300}
              height={200}
              style={{ 
                maxWidth: "300px", 
                margin: "0 auto 1rem", 
                border: "1px solid #ddd",
                borderRadius: "8px"
              }} 
            />
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
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

        {showFeedback && questions[currentQuestion].explanation && (
          <div style={{
            backgroundColor: "#E8F5E9",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "1rem",
            fontSize: "0.9rem"
          }}>
            {questions[currentQuestion].explanation}
          </div>
        )}

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