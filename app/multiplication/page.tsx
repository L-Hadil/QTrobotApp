"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function Multiplication() {
  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 * num2 };
  }

  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const checkAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setFeedback("Bravo ! 🎉 C'est correct !");
    } else {
      setFeedback(`Oups ! La bonne réponse était ${question.answer}`);
    }

    setTimeout(() => {
      setQuestion(generateQuestion());
      setUserAnswer("");
      setFeedback("");
    }, 3000);
  };

  const getRobotExpression = () => {
    if (feedback.includes("Bravo")) return "happy";
    if (feedback.includes("Oups")) return "cry";
    return "neutral";
  };

  return (
    <div style={{
      textAlign: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      color: "black",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    }}>
      {/* Robot QT */}
      <div style={{ marginBottom: "2rem" }}>
        <QTRobot expression={getRobotExpression()} />
      </div>

      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "500px",
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Multiplication</h1>
        
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
          {question.num1} × {question.num2} = ?
        </h2>
        
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Votre réponse..."
          style={{
            padding: "0.75rem",
            fontSize: "1rem",
            width: "80%",
            maxWidth: "200px",
            textAlign: "center",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            marginBottom: "1rem",
          }}
        />
        
        <button
          onClick={checkAnswer}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            fontSize: "1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
        >
          Valider ✅
        </button>
        
        {feedback && (
          <p style={{
            fontSize: "1.25rem",
            marginTop: "1rem",
            color: feedback.includes("Bravo") ? "#10b981" : "#ef4444",
          }}>
            {feedback}
          </p>
        )}
      </div>

      <Link href="/" style={{
        marginTop: "2rem",
        backgroundColor: "#001500",
        color: "white",
        padding: "0.75rem 1.5rem",
        borderRadius: "9999px",
        textDecoration: "none",
        fontSize: "1rem",
        transition: "background-color 0.2s",
      }}>
        Back to Home
      </Link>
    </div>
  );
}