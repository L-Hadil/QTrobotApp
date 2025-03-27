"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function MultiplicationTable() {
  const [currentTable, setCurrentTable] = useState<number>(1);
  const [completedTables, setCompletedTables] = useState<number[]>([]);
  const [checkedMultipliers, setCheckedMultipliers] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [showTimeUpNotification, setShowTimeUpNotification] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isTableComplete = checkedMultipliers.length === 10;

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isTableComplete) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isTableComplete) {
      // Time's up - show notification and advance to next table
      setShowTimeUpNotification(true);
      const notificationTimer = setTimeout(() => {
        setShowTimeUpNotification(false);
        handleNextTable();
      }, 3000);
      
      return () => clearTimeout(notificationTimer);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isTableComplete]);

  const add30Seconds = () => {
    setTimeLeft(prev => prev + 30);
  };

  const handleNextTable = () => {
    if (currentTable < 10) {
      // Add 30s bonus if table was completed
      const newTime = isTableComplete ? timeLeft + 30 : 30;
      
      setCurrentTable(currentTable + 1);
      setCheckedMultipliers([]);
      setTimeLeft(newTime);
    }
  };

  const toggleMultiplierCheck = (multiplier: number) => {
    if (checkedMultipliers.includes(multiplier)) {
      setCheckedMultipliers(checkedMultipliers.filter(m => m !== multiplier));
    } else {
      setCheckedMultipliers([...checkedMultipliers, multiplier]);
    }
  };

  useEffect(() => {
    if (isTableComplete && !completedTables.includes(currentTable)) {
      setCompletedTables([...completedTables, currentTable]);
      setShowCelebration(true);
      
      const timer = setTimeout(() => {
        setShowCelebration(false);
        handleNextTable();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isTableComplete, currentTable, completedTables]);

  const getRobotExpression = () => {
    if (showCelebration) return "happy";
    if (timeLeft < 10) return "confused";
    if (checkedMultipliers.length > 0) return "neutral";
    return "neutral";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTableColor = (num: number) => {
    if (completedTables.includes(num)) return "#10b981"; // Vert si complété
    if (num === currentTable) {
      return timeLeft === 0 ? "#ef4444" : "#3b82f6"; // Rouge si temps écoulé, sinon bleu
    }
    return "#e5e7eb"; // Gris pour les tables non commencées
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
      {/* Celebration Message */}
      {showCelebration && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            maxWidth: "500px",
          }}>
            <h2 style={{ fontSize: "2rem", color: "#10b981" }}>Félicitations! 🎉</h2>
            <p style={{ fontSize: "1.2rem" }}>Vous avez maîtrisé la table de {currentTable}!</p>
            <p style={{ fontSize: "1rem", color: "#10b981" }}>+30 secondes bonus!</p>
          </div>
        </div>
      )}

      {/* Time's Up Notification */}
      {showTimeUpNotification && (
        <div style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#ef4444",
          color: "white",
          padding: "1rem 2rem",
          borderRadius: "8px",
          zIndex: 100,
          animation: "fadeInOut 3s forwards",
        }}>
          Temps écoulé! Passage à la table suivante...
        </div>
      )}

      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}>
        {/* QT Robot Section */}
        <div style={{ flex: 1 }}>
          <QTRobot expression={getRobotExpression()} />
          
          {/* Timer Display */}
          <div style={{
            margin: "1rem 0",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: timeLeft < 10 ? "#ef4444" : "#3b82f6"
          }}>
            Temps restant: {formatTime(timeLeft)}
          </div>

          {/* Timer Controls */}
          <div style={{ margin: "1rem 0", display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={add30Seconds}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              +30 secondes
            </button>
            <button
              onClick={handleNextTable}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Table Suivante
            </button>
          </div>

          {/* Progress Tracker */}
          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Progrès</h3>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center"
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <div
                  key={num}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: getTableColor(num),
                    color: completedTables.includes(num) || num === currentTable 
                      ? "white" 
                      : "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (!completedTables.includes(num)) {
                      setCurrentTable(num);
                      setCheckedMultipliers([]);
                      setTimeLeft(30);
                    }
                  }}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multiplication Table Section */}
        <div style={{
          flex: 1,
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}>
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: "bold", 
            marginBottom: "1.5rem",
            color: completedTables.includes(currentTable) ? "#10b981" : "inherit"
          }}>
            Table de {currentTable}
            {completedTables.includes(currentTable) && " ✓"}
          </h1>
          
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            opacity: completedTables.includes(currentTable) ? 0.7 : 1
          }}>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(multiplier => (
                <tr key={multiplier}>
                  <td style={{ 
                    padding: "0.5rem",
                    textAlign: "right",
                    borderBottom: "1px solid #e5e7eb",
                    textDecoration: checkedMultipliers.includes(multiplier) ? "line-through" : "none"
                  }}>
                    {currentTable} × {multiplier} =
                  </td>
                  <td style={{ 
                    padding: "0.5rem",
                    textAlign: "left",
                    borderBottom: "1px solid #e5e7eb",
                    fontWeight: "bold"
                  }}>
                    {currentTable * multiplier}
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    <input
                      type="checkbox"
                      checked={checkedMultipliers.includes(multiplier) || completedTables.includes(currentTable)}
                      onChange={() => toggleMultiplierCheck(multiplier)}
                      disabled={completedTables.includes(currentTable)}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        accentColor: "#10b981",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isTableComplete && !completedTables.includes(currentTable) && (
            <p style={{ 
              marginTop: "1rem",
              color: "#10b981",
              fontWeight: "bold"
            }}>
              Bravo! Vous avez complété cette table! ✔️
            </p>
          )}
        </div>
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
        Retour à l'accueil
      </Link>

      {/* Add this to your global CSS */}
      <style jsx global>{`
        @keyframes fadeInOut {
          0% { opacity: 0; top: 0; }
          10% { opacity: 1; top: 20px; }
          90% { opacity: 1; top: 20px; }
          100% { opacity: 0; top: 0; }
        }
      `}</style>
    </div>
  );
}