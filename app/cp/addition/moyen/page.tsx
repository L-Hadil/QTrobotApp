"use client";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import QTRobot from "@/app/components/QTRobot";
import { useRouter } from "next/navigation";

export default function AdditionMoyenPage() {
  const [currentExpression, setCurrentExpression] = useState<"happy" | "talking" | "sad" | "neutral">("neutral");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
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

  const generateExercise = () => {
    const a = Math.floor(Math.random() * 11); // Nombres de 0 à 10
    const b = Math.floor(Math.random() * 11);
    return { 
      question: `${a} + ${b} = ?`, 
      answer: a + b,
      explanation: `Si tu as ${a} bonbons et qu'on t'en donne ${b} de plus, tu auras ${a + b} bonbons.`
    };
  };

  const [exercise, setExercise] = useState(generateExercise());

  useEffect(() => {
    speak(
      exercise.question,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [exercise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === exercise.answer;
    
    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
    }));
    setCurrentExpression(isCorrect ? "happy" : "sad");
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestion < 19) {
        setCurrentQuestion(currentQuestion + 1);
        setExercise(generateExercise());
        setUserAnswer("");
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
      niveau: localStorage.getItem("niveau") || "CP",
      exercise: "Addition Moyenne",
      totalQuestions: 20,
      correctAnswers: score.correct,
      incorrectAnswers: score.incorrect,
      timeSpent: timeSpentSeconds,
      completionDate: new Date().toISOString(),
      details: {
        problem: exercise.question,
        userAnswer: userAnswer,
        correctAnswer: exercise.answer,
        isCorrect: parseInt(userAnswer) === exercise.answer,
        explanation: exercise.explanation
      }
    };

    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem("mathResults") || "[]");
    localStorage.setItem("mathResults", JSON.stringify([...existingData, results]));

    // Redirect to recap page
    router.push(`/recap?name=${encodeURIComponent(childName)}&age=${childAge}&correct=${score.correct}&total=20&time=${timeSpentSeconds}`);
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

      <div style={{ marginBottom: "1rem" }}>
        <QTRobot expression={currentExpression} />
      </div>

      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        width: "100%"
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#10b981" }}>Addition moyenne (nombres de 0 à 10)</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "black" }}>Question {currentQuestion + 1}/20</p>
        
        <div style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1.5rem 0",
          color: "#065f46"
        }}>
          {exercise.question}
        </div>

        {!showFeedback ? (
          <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{ 
                padding: "10px",
                fontSize: "1.5rem",
                width: "100px",
                textAlign: "center",
                border: "2px solid #10b981",
                borderRadius: "8px",
                marginRight: "10px",
                color: "black"
              }}
              min="0"
              max="20"
              required
            />
            <button 
              type="submit" 
              style={{ 
                padding: "10px 20px",
                backgroundColor: "#10b981",
                color: "white",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              Valider
            </button>
          </form>
        ) : (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ 
              fontSize: "1.2rem",
              color: parseInt(userAnswer) === exercise.answer ? "#10b981" : "#ef4444",
              fontWeight: "bold"
            }}>
              {parseInt(userAnswer) === exercise.answer ? "Super !" : "Presque !"}
            </p>
            <p style={{ fontSize: "1.1rem" }}>{exercise.explanation}</p>
          </div>
        )}

        <div style={{ 
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1.5rem"
        }}>
          <div style={{ color: "#10b981" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Bonnes réponses</p>
            <p style={{ fontSize: "1.5rem" }}>{score.correct}</p>
          </div>
          <div style={{ color: "#ef4444" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Mauvaises réponses</p>
            <p style={{ fontSize: "1.5rem" }}>{score.incorrect}</p>
          </div>
        </div>

        {currentQuestion === 19 && showFeedback && (
          <div style={{ 
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#dcfce7",
            borderRadius: "8px"
          }}>
            <h2 style={{ color: "#065f46" }}>Résultat final</h2>
            <p style={{ fontSize: "1.2rem" }}>
              Tu as réussi {score.correct} sur 20 questions !
            </p>
            <p style={{ 
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: score.correct >= 16 ? "#10b981" : score.correct >= 12 ? "#f59e0b" : "#ef4444"
            }}>
              {score.correct >= 16 ? "Génial !" : score.correct >= 12 ? "Bien joué !" : "Tu progresses !"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}