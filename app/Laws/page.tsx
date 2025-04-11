"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

interface ChildData {
  name: string;
  age: number;
  totalTime: number;
  shapeTimes: Record<string, number>;
  completionDate: string;
}

type Shape = {
  name: string;
  image: string;
  dimensions: Record<string, { label: string; type: string }>;
  areaFormula: string;
  perimeterFormula: string;
  areaCalculation: (values: Record<string, number>) => number;
  perimeterCalculation: (values: Record<string, number>) => number;
};

export default function GeometryCalculator() {
  const shapes: Shape[] = [
    {
      name: "Carré",
      image: "/images/carre.png",
      dimensions: { side: { label: "Côté (cm)", type: "number" } },
      areaFormula: "Côté × Côté",
      perimeterFormula: "4 × Côté",
      areaCalculation: (values) => values.side * values.side,
      perimeterCalculation: (values) => 4 * values.side,
    },
    {
      name: "Rectangle",
      image: "/images/rectangle.png",
      dimensions: {
        length: { label: "Longueur (cm)", type: "number" },
        width: { label: "Largeur (cm)", type: "number" },
      },
      areaFormula: "Longueur × Largeur",
      perimeterFormula: "2 × (Longueur + Largeur)",
      areaCalculation: (values) => values.length * values.width,
      perimeterCalculation: (values) => 2 * (values.length + values.width),
    },
    {
      name: "Cercle",
      image: "/images/cercle.png",
      dimensions: { radius: { label: "Rayon (cm)", type: "number" } },
      areaFormula: "π × Rayon²",
      perimeterFormula: "2 × π × Rayon",
      areaCalculation: (values) => Math.PI * values.radius * values.radius,
      perimeterCalculation: (values) => 2 * Math.PI * values.radius,
    },
    {
      name: "Triangle",
      image: "/images/triangle.png",
      dimensions: {
        base: { label: "Base (cm)", type: "number" },
        height: { label: "Hauteur (cm)", type: "number" },
        side1: { label: "Côté 1 (cm)", type: "number" },
        side2: { label: "Côté 2 (cm)", type: "number" },
      },
      areaFormula: "(Base × Hauteur) / 2",
      perimeterFormula: "Base + Côté 1 + Côté 2",
      areaCalculation: (values) => (values.base * values.height) / 2,
      perimeterCalculation: (values) => values.base + values.side1 + values.side2,
    },
  ];

  const [currentShapeIndex, setCurrentShapeIndex] = useState<number>(0);
  const [completedShapes, setCompletedShapes] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [childData, setChildData] = useState({ name: "", age: "" });
  const [totalTime, setTotalTime] = useState<number>(0);
  const [shapeTimes, setShapeTimes] = useState<Record<string, number>>({});
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [currentShapeTime, setCurrentShapeTime] = useState<number>(0);
  const [dimensionValues, setDimensionValues] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  
  const startTimeRef = useRef<number>(Date.now());
  const currentShape = shapes[currentShapeIndex];

  // Update current shape time every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (!showCelebration && !showCompletionForm && !showFinalMessage) {
        setCurrentShapeTime(Math.round((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showCelebration, showCompletionForm, showFinalMessage]);

  const handleNextShape = () => {
    // Calculate time taken for this shape in seconds
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTimeRef.current) / 1000);
    
    // Update times
    setShapeTimes(prev => ({
      ...prev,
      [currentShape.name]: timeTaken
    }));
    
    setTotalTime(prev => prev + timeTaken);
    
    if (currentShapeIndex < shapes.length - 1) {
      setCurrentShapeIndex(currentShapeIndex + 1);
      setDimensionValues({});
      setShowResults(false);
      startTimeRef.current = Date.now();
      setCurrentShapeTime(0);
    } else {
      setShowCompletionForm(true);
    }
  };

  const handleDimensionChange = (dimension: string, value: string) => {
    setDimensionValues(prev => ({
      ...prev,
      [dimension]: parseFloat(value) || 0
    }));
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    setCurrentShapeTime(0);
    setShowResults(false);
  }, [currentShapeIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: ChildData = {
      name: childData.name,
      age: parseInt(childData.age),
      totalTime: totalTime,
      shapeTimes: shapeTimes,
      completionDate: new Date().toISOString()
    };

    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem("geometryProgress") || "[]");
    localStorage.setItem("geometryProgress", JSON.stringify([...existingData, data]));
    
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
    if (showResults) return "neutral";
    return "neutral";
  };

  const markShapeComplete = () => {
    if (!completedShapes.includes(currentShapeIndex)) {
      setCompletedShapes([...completedShapes, currentShapeIndex]);
      setShowCelebration(true);
      
      const timer = setTimeout(() => {
        setShowCelebration(false);
        handleNextShape();
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
            <p style={{ fontSize: "1.2rem" }}>Vous avez maîtrisé le {currentShape.name}!</p>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", margin: "1rem 0" }}>
              Temps pris: {formatTime(shapeTimes[currentShape.name] || currentShapeTime)}
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              Temps total: {formatTime(totalTime + (shapeTimes[currentShape.name] || currentShapeTime))}
            </p>
            <button
              onClick={() => {
                setShowCelebration(false);
                handleNextShape();
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
            
            {/* Shape details */}
            <div style={{ 
              maxHeight: "200px", 
              overflowY: "auto",
              margin: "1rem 0",
              padding: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              textAlign: "left"
            }}>
              {shapes.map((shape, index) => (
                <p key={index}>
                  {shape.name}: {formatTime(shapeTimes[shape.name] || 0)}
                  {completedShapes.includes(index) && " ✓"}
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
            
            {/* Current Shape Time Display */}
            <div style={{
              margin: "1rem 0",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#3b82f6",
              backgroundColor: "rgba(255,255,255,0.7)",
              padding: "0.5rem",
              borderRadius: "8px",
            }}>
              Temps pour cette forme: {formatTime(Math.round((Date.now() - startTimeRef.current) / 1000))}
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
                {shapes.map((shape, index) => (
                  <div
                    key={index}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: completedShapes.includes(index) 
                        ? "#10b981" 
                        : index === currentShapeIndex 
                          ? "#3b82f6" 
                          : "#e5e7eb",
                      color: completedShapes.includes(index) || index === currentShapeIndex 
                        ? "white" 
                        : "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (!completedShapes.includes(index)) {
                        setCurrentShapeIndex(index);
                        setDimensionValues({});
                        setShowResults(false);
                        startTimeRef.current = Date.now();
                      }
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shape Calculation Section */}
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
              color: completedShapes.includes(currentShapeIndex) ? "#10b981" : "inherit"
            }}>
              {currentShape.name}
              {completedShapes.includes(currentShapeIndex) && " ✓"}
            </h1>
            
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <img 
                src={currentShape.image} 
                alt={currentShape.name} 
                style={{ width: "150px", height: "150px", objectFit: "contain" }} 
              />
            </div>
            
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Dimensions:</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                {Object.entries(currentShape.dimensions).map(([dimension, { label, type }]) => (
                  <div key={dimension}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>{label}</label>
                    <input
                      type={type}
                      value={dimensionValues[dimension] || ""}
                      onChange={(e) => handleDimensionChange(dimension, e.target.value)}
                      style={{
                        padding: "0.5rem",
                        width: "100%",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {!showResults ? (
              <button
                onClick={calculateResults}
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
                Calculer
              </button>
            ) : (
              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Formules:</h3>
                  <p>Surface: {currentShape.areaFormula}</p>
                  <p>Périmètre: {currentShape.perimeterFormula}</p>
                </div>
                
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Résultats:</h3>
                  <p>Surface: {currentShape.areaCalculation(dimensionValues).toFixed(2)} cm²</p>
                  <p>Périmètre: {currentShape.perimeterCalculation(dimensionValues).toFixed(2)} cm</p>
                </div>
                
                <button
                  onClick={markShapeComplete}
                  style={{
                    padding: "0.5rem 1.5rem",
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
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