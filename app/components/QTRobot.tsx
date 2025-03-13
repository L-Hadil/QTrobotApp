"use client";
import { useState } from "react";

type Question = {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
};

export default function QTRobot() {
  function generateQuestion(): Question {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "×"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    if (operator === "+") {
      answer = num1 + num2;
    } else if (operator === "-") {
      answer = num1 - num2;
    } else if (operator === "×") {
      answer = num1 * num2;
    } else {
      answer = 0; // Valeur par défaut pour éviter undefined
    }

    return { num1, num2, operator, answer };
  }

  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const checkAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setFeedback("Bravo ! 🎉 C'est correct !");
      speak("Bravo ! C'est correct !");
    } else {
      setFeedback(`Oups ! La bonne réponse était ${question.answer}`);
      speak(`Oups ! La bonne réponse était ${question.answer}`);
    }

    setTimeout(() => {
      const newQuestion = generateQuestion();
      setQuestion(newQuestion);
      setUserAnswer("");
      setFeedback("");
      speak(`Nouvelle question ! ${newQuestion.num1} ${newQuestion.operator} ${newQuestion.num2} = ?`);
    }, 3000);
  };

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>QTrobot Math 🧮</h2>
      <img src="/qtrobot.gif" alt="QTrobot" width={150} />

      <h3>Question :</h3>
      <p style={{ fontSize: "24px" }}>
        {question.num1} {question.operator} {question.num2} = ?
      </p>

      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Votre réponse..."
        style={{
          padding: "10px",
          fontSize: "20px",
          width: "150px",
          textAlign: "center",
        }}
      />
      <button
        onClick={checkAnswer}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Valider ✅
      </button>

      <p style={{ fontSize: "20px", color: feedback.includes("Bravo") ? "green" : "red" }}>
        {feedback}
      </p>
    </div>
  );
}
