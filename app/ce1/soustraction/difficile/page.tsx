"use client";
import { useEffect, useState } from "react";
import { useSpeech } from "@/app/hooks/useSpeech";
import QTRobot from "@/app/components/QTRobot";
import { useRouter } from "next/navigation";

export default function SoustractionDifficileCE1() {
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

  useEffect(() => {
    speak(
      questions[currentQuestion].problem,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [currentQuestion]);

  useEffect(() => {
    speak(
      questions[currentQuestion].problem,
      () => setCurrentExpression("talking"),
      () => setCurrentExpression("neutral")
    );
  }, [currentQuestion]);
  const questions = [
    { 
      problem: "Marie a 54 billes. Elle en donne 28 à son frère. Combien lui en reste-t-il?", 
      answer: 26 
    },
    { 
      problem: "Dans une classe de 30 élèves, 17 sont des garçons. Combien y a-t-il de filles?", 
      answer: 13 
    },
    { 
      problem: "Un livre coûte 45€. Pierre en a déjà économisé 29€. Combien doit-il encore économiser?", 
      answer: 16 
    },
    { 
      problem: "Lucie a cueilli 62 fleurs. Elle en utilise 35 pour faire un bouquet. Combien de fleurs lui restent-elles?", 
      answer: 27 
    },
    { 
      problem: "Dans un parc, il y a 78 arbres. 49 sont des chênes. Combien ne sont pas des chênes?", 
      answer: 29 
    },
    { 
      problem: "Marc a 93 points au jeu. Il perd 57 points. Combien a-t-il de points maintenant?", 
      answer: 36 
    },
    { 
      problem: "Une boulangerie a fait 85 croissants le matin. Il en reste 38 le soir. Combien ont été vendus?", 
      answer: 47 
    },
    { 
      problem: "Sarah a 120€. Elle achète un jouet à 75€. Combien lui reste-t-il?", 
      answer: 45 
    },
    { 
      problem: "Dans une basse-cour, il y a 67 animaux. 39 sont des poules. Combien sont autres?", 
      answer: 28 
    },
    { 
      problem: "Un train a 150 places. 124 sont occupées. Combien de places sont libres?", 
      answer: 26 
    },
    { 
      problem: "Paul a 82 autocollants. Il en colle 56 dans son album. Combien lui en reste-t-il?", 
      answer: 26 
    },
    { 
      problem: "Une ferme a 95 animaux. 68 sont des moutons. Combien ne sont pas des moutons?", 
      answer: 27 
    },
    { 
      problem: "Léa a 60 bonbons. Elle en mange 23. Combien lui en reste-t-il?", 
      answer: 37 
    },
    { 
      problem: "Un magasin a 110 jouets. 84 sont vendus en une semaine. Combien restent-ils?", 
      answer: 26 
    },
    { 
      problem: "Tom a 75€. Il dépense 48€ pour un cadeau. Combien lui reste-t-il?", 
      answer: 27 
    }
  ];

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === questions[currentQuestion].answer;
    
    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
    }));
    setCurrentExpression(isCorrect ? "happy" : "sad");
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
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
      niveau: localStorage.getItem("niveau") || "CE1",
      exercise: "Soustraction Difficile",
      totalQuestions: questions.length,
      correctAnswers: score.correct,
      incorrectAnswers: score.incorrect,
      timeSpent: timeSpentSeconds,
      completionDate: new Date().toISOString(),
      details: questions.map((q, i) => ({
        problem: q.problem,
        userAnswer: i === currentQuestion ? userAnswer : "N/A",
        correctAnswer: q.answer,
        isCorrect: i === currentQuestion ? parseInt(userAnswer) === q.answer : false
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
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#f44336" }}>Problèmes de soustraction - CE1</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#f44336" }}>Question {currentQuestion + 1}/{questions.length}</p>
        <div style={{ 
          fontSize: "1.2rem",
          marginBottom: "2rem",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "left", 
          color: "#f44336"
        }}>
          {questions[currentQuestion].problem}
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
              border: "2px solid #f44336",
              borderRadius: "5px",
              color:"black"
            }}
            disabled={showFeedback}
          />
          <br />
          <button 
            type="submit" 
            style={{ 
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer"
            }}
            disabled={showFeedback}
          >
            Valider
          </button>
        </form>

        {showFeedback && (
          <div style={{ 
            marginTop: "1rem",
            fontSize: "1.2rem",
            color: parseInt(userAnswer) === questions[currentQuestion].answer ? "#4caf50" : "#f44336"
          }}>
            {parseInt(userAnswer) === questions[currentQuestion].answer ? "Super !" : `La réponse était ${questions[currentQuestion].answer}`}
          </div>
        )}

        <div style={{ 
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "1.1rem"
        }}>
          <p style={{ color: "#4caf50" }}>Bonnes réponses: {score.correct}</p>
          <p style={{ color: "#f44336" }}>Mauvaises réponses: {score.incorrect}</p>
        </div>
      </div>
    </div>
  );
}