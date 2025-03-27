"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function Addition() {
  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
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
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-black mb-6">Addition</h1>
        <QTRobot expression={getRobotExpression()} />
        
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl text-black font-semibold mb-2">
            {question.num1} + {question.num2} = ?
          </h2>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Votre réponse..."
            className="p-3 text-lg w-40 text-center text-black border border-gray-300 rounded mb-4"
          />
          <button
            onClick={checkAnswer}
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition"
          >
            Valider ✅
          </button>
          {feedback && <p className="text-xl text-black mt-4">{feedback}</p>}
        </div>
      </div>
    </div>
  );
}