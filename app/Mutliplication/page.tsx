"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

interface ChildData {
  name: string;
  age: number;
  totalTime: number;
  tableTimes: Record<number, number>;
  completionDate: string;
}

export default function MultiplicationTable() {
  const [currentTable, setCurrentTable] = useState<number>(1);
  const [completedTables, setCompletedTables] = useState<number[]>([]);
  const [checkedMultipliers, setCheckedMultipliers] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [childData, setChildData] = useState({ name: "", age: "" });
  const [totalTime, setTotalTime] = useState<number>(0);
  const [tableTimes, setTableTimes] = useState<Record<number, number>>({});
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [currentTableTime, setCurrentTableTime] = useState<number>(0);
  
  const startTimeRef = useRef<number>(Date.now());
  const isTableComplete = checkedMultipliers.length === 10;

  // Update current table time every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (!showCelebration && !showCompletionForm && !showFinalMessage) {
        setCurrentTableTime(Math.round((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showCelebration, showCompletionForm, showFinalMessage]);

  const handleNextTable = () => {
    // Calculate time taken for this table in seconds
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTimeRef.current) / 1000);
    
    // Update times
    setTableTimes(prev => ({
      ...prev,
      [currentTable]: timeTaken
    }));
    
    setTotalTime(prev => prev + timeTaken);
    
    if (currentTable < 10) {
      setCurrentTable(currentTable + 1);
      setCheckedMultipliers([]);
      startTimeRef.current = Date.now(); // Reset timer for next table
      setCurrentTableTime(0);
    } else {
      setShowCompletionForm(true);
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
    startTimeRef.current = Date.now(); // Start timing when table changes
    setCurrentTableTime(0);
    
    if (isTableComplete && !completedTables.includes(currentTable)) {
      const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);
      setCompletedTables([...completedTables, currentTable]);
      setShowCelebration(true);
      
      const timer = setTimeout(() => {
        setShowCelebration(false);
        handleNextTable();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isTableComplete, currentTable, completedTables]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: ChildData = {
      name: childData.name,
      age: parseInt(childData.age),
      totalTime: totalTime,
      tableTimes: tableTimes,
      completionDate: new Date().toISOString()
    };

    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem("mathProgress") || "[]");
    localStorage.setItem("mathProgress", JSON.stringify([...existingData, data]));
    
    setShowFinalMessage(true);
    setShowCompletionForm(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const getRobotExpression = () => {
    if (showCelebration) return "happy";
    if (checkedMultipliers.length > 0) return "neutral";
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
      backgroundImage: "url('/images/background-image.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}>
      {/* Celebration Message - Updated with precise time */}
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
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: "2rem", color: "#10b981" }}>Félicitations! 🎉</h2>
            <p style={{ fontSize: "1.2rem" }}>Vous avez maîtrisé la table de {currentTable}!</p>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", margin: "1rem 0" }}>
              Temps pris: {formatTime(tableTimes[currentTable] || currentTableTime)}
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              Temps total: {formatTime(totalTime + (tableTimes[currentTable] || currentTableTime))}
            </p>
            <button
              onClick={() => {
                setShowCelebration(false);
                handleNextTable();
              }}
              style={{
                marginTop: "1.5rem",
                padding: "0.5rem 1.5rem",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* Completion Form */}
      {showCompletionForm && (
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
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: "2rem", color: "#10b981" }}>Résultats Finaux</h2>
            
            {/* Table details */}
            <div style={{ 
              maxHeight: "200px", 
              overflowY: "auto",
              margin: "1rem 0",
              padding: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              textAlign: "left"
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <p key={num}>
                  Table {num}: {formatTime(tableTimes[num] || 0)}
                  {completedTables.includes(num) && " ✓"}
                </p>
              ))}
            </div>
            
            <p style={{ 
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: "1rem 0"
            }}>
              Temps total: {formatTime(totalTime)}
            </p>
            
            <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Nom de l'enfant:
                </label>
                <input
                  type="text"
                  value={childData.name}
                  onChange={(e) => setChildData({...childData, name: e.target.value})}
                  required
                  style={{
                    padding: "0.5rem",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }}
                />
              </div>
              
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Âge de l'enfant:
                </label>
                <input
                  type="number"
                  value={childData.age}
                  onChange={(e) => setChildData({...childData, age: e.target.value})}
                  required
                  min="4"
                  max="12"
                  style={{
                    padding: "0.5rem",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1.5rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Final Message */}
      {showFinalMessage && (
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
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: "2rem", color: "#10b981" }}>Résultats enregistrés!</h2>
            <p style={{ fontSize: "1.2rem" }}>Merci {childData.name}!</p>
            <p>Temps total: {formatTime(totalTime)}</p>
            
            <Link href="/" style={{
              display: "inline-block",
              marginTop: "1.5rem",
              padding: "0.5rem 1.5rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              textDecoration: "none",
            }}>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!showCompletionForm && !showFinalMessage && (
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
            
            {/* Current Table Time Display */}
            <div style={{
              margin: "1rem 0",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#3b82f6",
              backgroundColor: "rgba(255,255,255,0.7)",
              padding: "0.5rem",
              borderRadius: "8px",
            }}>
              Temps pour cette table: {formatTime(Math.round((Date.now() - startTimeRef.current) / 1000))}
            </div>

            {/* Progress Tracker */}
            <div style={{ 
              marginTop: "1rem",
              backgroundColor: "rgba(255,255,255,0.7)",
              padding: "1rem",
              borderRadius: "12px",
            }}>
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
                      backgroundColor: completedTables.includes(num) 
                        ? "#10b981" 
                        : num === currentTable 
                          ? "#3b82f6" 
                          : "#e5e7eb",
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
                        startTimeRef.current = Date.now();
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
            backgroundColor: "rgba(255,255,255,0.9)",
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
      )}

      {!showCompletionForm && !showFinalMessage && (
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
      )}
    </div>
  );
}