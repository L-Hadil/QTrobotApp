"use client";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import QTRobot from "@/app/components/QTRobot";
import { saveActivityToSession } from "@/app/utils/sessionUtils";

export default function SoustractionMoyen() {

  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [currentExpression, setCurrentExpression] = useState<"happy" | "sad" | "neutral" | "talking">("neutral");
  const { speak } = useSpeech();
  useEffect(() => {
    localStorage.setItem("niveau", "CP");
    localStorage.setItem("categorie", "Soustraction");
    localStorage.setItem("difficulte", "Moyenne");
  }, []);
  
  useEffect(() => {
    speak(
      exercises[currentQuestion].question,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [currentQuestion]);
  const exercises = [
    { question: "12 - 5 = ?", answer: 7 },
    { question: "15 - 8 = ?", answer: 7 },
    { question: "18 - 9 = ?", answer: 9 },
    { question: "14 - 6 = ?", answer: 8 },
    { question: "17 - 9 = ?", answer: 8 },
    { question: "20 - 12 = ?", answer: 8 },
    { question: "13 - 7 = ?", answer: 6 },
    { question: "16 - 8 = ?", answer: 8 },
    { question: "19 - 11 = ?", answer: 8 },
    { question: "11 - 4 = ?", answer: 7 },
    { question: "15 - 7 = ?", answer: 8 },
    { question: "18 - 12 = ?", answer: 6 },
    { question: "14 - 9 = ?", answer: 5 },
    { question: "17 - 8 = ?", answer: 9 },
    { question: "20 - 15 = ?", answer: 5 },
    { question: "13 - 5 = ?", answer: 8 },
    { question: "16 - 9 = ?", answer: 7 },
    { question: "19 - 13 = ?", answer: 6 },
    { question: "12 - 8 = ?", answer: 4 },
    { question: "15 - 6 = ?", answer: 9 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = exercises[currentQuestion].answer;
    const isAnswerCorrect = parseInt(userAnswer) === correctAnswer;
  
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
  
    const newScore = {
      correct: isAnswerCorrect ? score.correct + 1 : score.correct,
      incorrect: !isAnswerCorrect ? score.incorrect + 1 : score.incorrect,
    };
  
    setScore(newScore);
    setCurrentExpression(isAnswerCorrect ? "happy" : "sad");
  
    // ✅ Enregistrement dans MongoDB (regroupé par catégorie + difficulté)
    await saveActivityToSession({
      correct: isAnswerCorrect ? 1 : 0,
      incorrect: !isAnswerCorrect ? 1 : 0,
    });
  
    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer("");
      if (currentQuestion < exercises.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
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
      <QTRobot expression={currentExpression} />
      
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "80%",
        maxWidth: "500px"
      }}>
        <h1 style={{ color: "#d45d79", marginBottom: "1.5rem" }}>Soustraction CP - Niveau Moyen</h1>
        
        {currentQuestion < exercises.length ? (
          <>
            <div style={{ fontSize: "2rem", margin: "1.5rem 0", color: "#d45d79" }}>
              {exercises[currentQuestion].question}
            </div>
            
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                style={{
                  padding: "10px",
                  fontSize: "1.5rem",
                  width: "100px",
                  textAlign: "center",
                  marginBottom: "1rem",
                  border: "2px solid #d45d79",
                  borderRadius: "5px",
                  color: "#d45d79"
                }}
                required
              />
              <br />
              <button 
                type="submit" 
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#d45d79",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Valider
              </button>
            </form>
            
            {showFeedback && (
              <div style={{
                marginTop: "1rem",
                color: isCorrect ? "green" : "red",
                fontSize: "1.2rem"
              }}>
                {isCorrect ? "Super !" : `La réponse était ${exercises[currentQuestion].answer}`}
              </div>
            )}
          </>
        ) : (
          <div style={{ fontSize: "1.5rem", color: "#d45d79" }}>
            <p>Félicitations ! Tu as terminé.</p>
            <p>Score: {score.correct}/{exercises.length}</p>
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setScore({ correct: 0, incorrect: 0 });
                setCurrentExpression("neutral");
              }}
              style={{
                marginTop: "1rem",
                padding: "10px 20px",
                backgroundColor: "#d45d79",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              Recommencer
            </button>
          </div>
        )}
        
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "green" }}>Bonnes réponses: {score.correct}</div>
          <div style={{ color: "red" }}>Mauvaises réponses: {score.incorrect}</div>
        </div>
        <div style={{ marginTop: "1rem", width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px" }}>
          <div 
            style={{ 
              width: `${(currentQuestion / exercises.length) * 100}%`, 
              height: "10px", 
              backgroundColor: "#d45d79",
              borderRadius: "5px",
              transition: "width 0.3s"
            }}
          ></div>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          Question {currentQuestion + 1}/{exercises.length}
        </div>
      </div>
    </div>
  );
}