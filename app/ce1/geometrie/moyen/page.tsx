"use client";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import QTRobot from "@/app/components/QTRobot";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GeometrieMoyenCE1() {
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
      question: "Quel solide a une base carrée et 4 faces triangulaires?",
      image: "/images/pyramide.png",
      answer: "pyramide",
      options: ["cube", "pyramide", "prisme"],
      explanation: "Une pyramide à base carrée a 1 base carrée et 4 faces triangulaires qui se rejoignent au sommet"
    },
    {
      question: "Quel solide peut à la fois rouler et glisser?",
      image: "/images/solides.png",
      answer: "cylindre",
      options: ["boule", "cylindre", "cône"],
      explanation: "Un cylindre peut rouler sur sa face courbe et glisser sur ses faces planes"
    },
    {
      question: "Combien de sommets a un cube?",
      image: "/images/cube.png",
      answer: "8",
      options: ["4", "6", "8"],
      explanation: "Un cube a 8 coins (sommets) où se rencontrent 3 arêtes"
    },
    {
      question: "Quelle figure est symétrique par rapport à cette droite?",
      image: "/images/symetrie-moyen.png",
      answer: "B",
      options: ["A", "B", "C"],
      explanation: "La figure B est la seule qui peut être pliée exactement sur elle-même le long de la ligne"
    },
    {
      question: "Quelle figure est symétrique par rapport à cette droite?",
      image: "/images/symetrie-moyen2.png",
      answer: "F",
      options: ["D", "E", "F"],
      explanation: "La figure F est symétrique par rapport à la droite verticale"
    },
    {
      question: "Comment se déplacer de B2 à D3?",
      image: "/images/grid.png",
      answer: "2 cases à droite et 1 case vers le bas",
      options: [
        "1 case à droite et 1 case vers le bas",
        "2 cases à droite et 1 case vers le bas",
        "2 cases vers le bas"
      ],
      explanation: "De B à D = +2 colonnes, de 2 à 3 = +1 ligne"
    },
    {
      question: "Quelle case est au nord-ouest de D3?",
      image: "/images/grid.png",
      answer: "C2",
      options: ["C2", "C4", "E2"],
      explanation: "Nord-ouest signifie une ligne vers le haut (-1) et une colonne vers la gauche (-1)"
    },
    {
      question: "Combien d'arêtes a une pyramide à base carrée?",
      image: "/images/pyramide.png",
      answer: "8",
      options: ["5", "8", "12"],
      explanation: "4 arêtes à la base carrée + 4 arêtes latérales = 8 arêtes"
    },
    {
      question: "Quel solide n'a pas de face plane?",
      image: "/images/solides.png",
      answer: "boule",
      options: ["cube", "boule", "pyramide"],
      explanation: "Une boule (sphère) est entièrement courbe sans aucune face plane"
    },
    {
      question: "Quelle est la position du cône par rapport à la sphère?",
      image: "/images/solides.png",
      answer: "en bas à droite",
      options: ["en bas à droite", "en haut à droite", "au centre"],
      explanation: "Sur l'image, le cône est positionné en bas et à droite de la sphère"
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
      exercise: "Géométrie Moyen",
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#ff9800" }}>Géométrie CE1 - Niveau Moyen</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#ff9800" }}>Question {currentQuestion + 1}/{questions.length}</p>
        
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#ff9800" }}>{questions[currentQuestion].question}</h2>
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