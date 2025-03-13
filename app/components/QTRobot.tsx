"use client";
import { useState } from "react";

// Définition du type Question
type Question = {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
};

export default function QTRobot() {
  // Génère une question mathématique aléatoire
  function generateQuestion(): Question {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "×"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    if (operator === "+") answer = num1 + num2;
    else if (operator === "-") answer = num1 - num2;
    else if (operator === "×") answer = num1 * num2;
    else answer = 0;

    return { num1, num2, operator, answer };
  }

  // États pour la question, la réponse de l'utilisateur et le feedback
  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  // Vérifie la réponse de l'utilisateur
  const checkAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setFeedback("Bravo ! 🎉 C'est correct !");
      speak("Bravo ! C'est correct !");
    } else {
      setFeedback(`Oups ! La bonne réponse était ${question.answer}`);
      speak(`Oups ! La bonne réponse était ${question.answer}`);
    }

    // Après 3 secondes, on génère une nouvelle question
    setTimeout(() => {
      const newQuestion = generateQuestion();
      setQuestion(newQuestion);
      setUserAnswer("");
      setFeedback("");
      speak(`Nouvelle question ! ${newQuestion.num1} ${newQuestion.operator} ${newQuestion.num2} = ?`);
    }, 3000);
  };

  // Synthèse vocale
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-6">QTrobot Math 🧮</h2>

      {/* Conteneur relatif pour superposer la coque et le gif */}
      <div className="relative w-[300px] h-auto mb-8">
        {/* Image statique (coque) */}
        <img
          src="https://docs.luxai.com/assets/images/qt_head-cd1f3ecbe79fb245a572462c68f363f1.png"
          alt="QTrobot Container"
          className="w-full h-auto"
        />
        {/* Gif superposé (yeux qui clignent) */}
        <img
          src="https://docs.luxai.com/assets/images/QT_QT_neutral_state_blinking-5d8d7cb24735325cf256575d9229db11.gif"
          alt="QTrobot Blinking Face"
          className="absolute top-[81px] left-[43px] w-[210px] h-auto rounded-xl"
        />
      </div>

      <div className="bg-white shadow-md rounded p-6 flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2">Question :</h3>
        <p className="text-2xl mb-4">
          {question.num1} {question.operator} {question.num2} = ?
        </p>

        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Votre réponse..."
          className="p-3 text-lg w-40 text-center border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={checkAnswer}
          className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition"
        >
          Valider ✅
        </button>

        {feedback && (
          <p
            className={`text-xl mt-4 ${
              feedback.includes("Bravo") ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}
