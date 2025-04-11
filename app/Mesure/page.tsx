"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

interface ChildData {
  name: string;
  age: number;
  totalTime: number;
  conversionTimes: Record<string, number>;
  completionDate: string;
}

type ConversionCategory = {
  name: string;
  icon: string;
  units: {
    name: string;
    conversions: {
      to: string;
      convert: (value: number) => number;
      formula: string;
    }[];
  }[];
};

export default function UnitConverter() {
  const categories: ConversionCategory[] = [
    {
      name: "Longueur",
      icon: "📏",
      units: [
        {
          name: "millimètre (mm)",
          conversions: [
            { to: "centimètre (cm)", convert: (v) => v / 10, formula: "mm ÷ 10" },
            { to: "mètre (m)", convert: (v) => v / 1000, formula: "mm ÷ 1000" },
            { to: "kilomètre (km)", convert: (v) => v / 1000000, formula: "mm ÷ 1,000,000" }
          ]
        },
        {
          name: "centimètre (cm)",
          conversions: [
            { to: "millimètre (mm)", convert: (v) => v * 10, formula: "cm × 10" },
            { to: "mètre (m)", convert: (v) => v / 100, formula: "cm ÷ 100" },
            { to: "kilomètre (km)", convert: (v) => v / 100000, formula: "cm ÷ 100,000" }
          ]
        },
        {
          name: "mètre (m)",
          conversions: [
            { to: "millimètre (mm)", convert: (v) => v * 1000, formula: "m × 1000" },
            { to: "centimètre (cm)", convert: (v) => v * 100, formula: "m × 100" },
            { to: "kilomètre (km)", convert: (v) => v / 1000, formula: "m ÷ 1000" }
          ]
        }
      ]
    },
    {
      name: "Masse",
      icon: "⚖️",
      units: [
        {
          name: "gramme (g)",
          conversions: [
            { to: "kilogramme (kg)", convert: (v) => v / 1000, formula: "g ÷ 1000" },
            { to: "milligramme (mg)", convert: (v) => v * 1000, formula: "g × 1000" }
          ]
        },
        {
          name: "kilogramme (kg)",
          conversions: [
            { to: "gramme (g)", convert: (v) => v * 1000, formula: "kg × 1000" },
            { to: "milligramme (mg)", convert: (v) => v * 1000000, formula: "kg × 1,000,000" }
          ]
        }
      ]
    },
    {
      name: "Volume",
      icon: "🧴",
      units: [
        {
          name: "millilitre (ml)",
          conversions: [
            { to: "centilitre (cl)", convert: (v) => v / 10, formula: "ml ÷ 10" },
            { to: "litre (l)", convert: (v) => v / 1000, formula: "ml ÷ 1000" }
          ]
        },
        {
          name: "litre (l)",
          conversions: [
            { to: "millilitre (ml)", convert: (v) => v * 1000, formula: "l × 1000" },
            { to: "centilitre (cl)", convert: (v) => v * 100, formula: "l × 100" }
          ]
        }
      ]
    }
  ];

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
  const [completedConversions, setCompletedConversions] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [childData, setChildData] = useState({ name: "", age: "" });
  const [totalTime, setTotalTime] = useState<number>(0);
  const [conversionTimes, setConversionTimes] = useState<Record<string, number>>({});
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [currentConversionTime, setCurrentConversionTime] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  
  const startTimeRef = useRef<number>(Date.now());
  const currentCategory = categories[currentCategoryIndex];
  const currentUnit = currentCategory.units[currentUnitIndex];

  // Update current conversion time every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (!showCelebration && !showCompletionForm && !showFinalMessage) {
        setCurrentConversionTime(Math.round((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showCelebration, showCompletionForm, showFinalMessage]);

  const handleNextConversion = () => {
    // Calculate time taken for this conversion in seconds
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTimeRef.current) / 1000);
    const conversionKey = `${currentCategory.name}: ${currentUnit.name}`;
    
    // Update times
    setConversionTimes(prev => ({
      ...prev,
      [conversionKey]: timeTaken
    }));
    
    setTotalTime(prev => prev + timeTaken);
    
    if (currentUnitIndex < currentCategory.units.length - 1) {
      setCurrentUnitIndex(currentUnitIndex + 1);
    } else if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentUnitIndex(0);
    } else {
      setShowCompletionForm(true);
    }
    
    setInputValue("");
    setShowResults(false);
    startTimeRef.current = Date.now();
    setCurrentConversionTime(0);
  };

  const calculateConversions = () => {
    if (inputValue && !isNaN(parseFloat(inputValue))) {
      setShowResults(true);
    }
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    setCurrentConversionTime(0);
    setShowResults(false);
  }, [currentCategoryIndex, currentUnitIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: ChildData = {
      name: childData.name,
      age: parseInt(childData.age),
      totalTime: totalTime,
      conversionTimes: conversionTimes,
      completionDate: new Date().toISOString()
    };

    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem("conversionProgress") || "[]");
    localStorage.setItem("conversionProgress", JSON.stringify([...existingData, data]));
    
    setShowFinalMessage(true);
    setShowCompletionForm(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const getRobotExpression = () => {
    if (showCelebration) return "kiss";
    if (showResults) return "neutral";
    return "neutral";
  };

  const markConversionComplete = () => {
    const conversionKey = `${currentCategory.name}: ${currentUnit.name}`;
    if (!completedConversions.includes(conversionKey)) {
      setCompletedConversions([...completedConversions, conversionKey]);
      setShowCelebration(true);
      
      const timer = setTimeout(() => {
        setShowCelebration(false);
        handleNextConversion();
      }, 3000);

      return () => clearTimeout(timer);
    }
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
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: "2rem", color: "#10b981" }}>Félicitations! 🎉</h2>
            <p style={{ fontSize: "1.2rem" }}>Vous avez maîtrisé les conversions {currentCategory.name}!</p>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", margin: "1rem 0" }}>
              Temps pris: {formatTime(conversionTimes[`${currentCategory.name}: ${currentUnit.name}`] || currentConversionTime)}
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              Temps total: {formatTime(totalTime + (conversionTimes[`${currentCategory.name}: ${currentUnit.name}`] || currentConversionTime))}
            </p>
            <button
              onClick={() => {
                setShowCelebration(false);
                handleNextConversion();
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
            
            {/* Conversion details */}
            <div style={{ 
              maxHeight: "200px", 
              overflowY: "auto",
              margin: "1rem 0",
              padding: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              textAlign: "left"
            }}>
              {categories.flatMap(category => 
                category.units.map(unit => {
                  const key = `${category.name}: ${unit.name}`;
                  return (
                    <p key={key}>
                      {key}: {formatTime(conversionTimes[key] || 0)}
                      {completedConversions.includes(key) && " ✓"}
                    </p>
                  );
                })
              )}
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
            
            {/* Current Conversion Time Display */}
            <div style={{
              margin: "1rem 0",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#3b82f6",
              backgroundColor: "rgba(255,255,255,0.7)",
              padding: "0.5rem",
              borderRadius: "8px",
            }}>
              Temps pour cette conversion: {formatTime(Math.round((Date.now() - startTimeRef.current) / 1000))}
            </div>

            {/* Category Selection */}
            <div style={{ 
              marginTop: "1rem",
              backgroundColor: "rgba(255,255,255,0.7)",
              padding: "1rem",
              borderRadius: "12px",
            }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Catégories</h3>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentCategoryIndex(index);
                      setCurrentUnitIndex(0);
                      startTimeRef.current = Date.now();
                    }}
                    style={{
                      padding: "0.5rem",
                      backgroundColor: currentCategoryIndex === index ? "#3b82f6" : "#e5e7eb",
                      color: currentCategoryIndex === index ? "white" : "black",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Unit Selection */}
            <div style={{ 
              marginTop: "1rem",
              backgroundColor: "rgba(255,255,255,0.7)",
              padding: "1rem",
              borderRadius: "12px",
            }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Unités</h3>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                justifyContent: "center"
              }}>
                {currentCategory.units.map((unit, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentUnitIndex(index);
                      startTimeRef.current = Date.now();
                    }}
                    style={{
                      padding: "0.5rem",
                      backgroundColor: currentUnitIndex === index ? "#10b981" : "#e5e7eb",
                      color: currentUnitIndex === index ? "white" : "black",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {unit.name.split(" (")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Conversion Section */}
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
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <span>{currentCategory.icon}</span>
              {currentCategory.name}
            </h1>
            
            <div style={{ 
              marginBottom: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f0fdf4",
              borderRadius: "8px"
            }}>
              <h2 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                Conversion: {currentUnit.name}
              </h2>
            </div>
            
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                Valeur à convertir:
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  padding: "0.8rem",
                  fontSize: "1.2rem",
                  width: "100%",
                  maxWidth: "200px",
                  border: "2px solid #bfdbfe",
                  borderRadius: "8px",
                  textAlign: "center"
                }}
              />
            </div>
            
            {!showResults ? (
              <button
                onClick={calculateConversions}
                disabled={!inputValue || isNaN(parseFloat(inputValue))}
                style={{
                  padding: "0.8rem 1.5rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  opacity: (!inputValue || isNaN(parseFloat(inputValue))) ? 0.5 : 1
                }}
              >
                Convertir
              </button>
            ) : (
              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ 
                  marginBottom: "1.5rem",
                  backgroundColor: "#f8fafc",
                  padding: "1rem",
                  borderRadius: "8px"
                }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Résultats:</h3>
                  <div style={{ display: "grid", gap: "0.8rem" }}>
                    {currentUnit.conversions.map((conv, index) => (
                      <div key={index} style={{ 
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <span style={{ fontWeight: "bold" }}>{conv.to}</span>
                        <span>
                          {conv.convert(parseFloat(inputValue)).toFixed(4)}
                          <span style={{ 
                            marginLeft: "0.5rem",
                            fontSize: "0.8rem",
                            color: "#64748b"
                          }}>
                            {conv.formula}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={markConversionComplete}
                  style={{
                    padding: "0.8rem 1.5rem",
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  J'ai compris!
                </button>
              </div>
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