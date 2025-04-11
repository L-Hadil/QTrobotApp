"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

interface StoryData {
  title: string;
  characters: string[];
  places: string[];
  plotPoints: string[];
  fullText: string;
}

export default function StoryCreator() {
  const themes = [
    { name: "Aventure", icon: "🏝️", prompts: ["Un trésor caché", "Une carte mystérieuse", "Un danger imprévu"] },
    { name: "Fantastique", icon: "🦄", prompts: ["Une créature magique", "Un sort qui tourne mal", "Un secret ancien"] },
    { name: "Animaux", icon: "🐻", prompts: ["Une amitié improbable", "Un problème à résoudre", "Un voyage inattendu"] }
  ];

  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [currentStep, setCurrentStep] = useState(1);
  const [story, setStory] = useState<StoryData>({
    title: "",
    characters: [],
    places: [],
    plotPoints: [],
    fullText: ""
  });
  const [isRecording, setIsRecording] = useState(false);
  const [showFinalStory, setShowFinalStory] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);

  const handleThemeSelect = (theme: typeof themes[0]) => {
    setCurrentTheme(theme);
    setCurrentStep(2);
  };

  const addCharacter = (character: string) => {
    setStory(prev => ({
      ...prev,
      characters: [...prev.characters, character]
    }));
  };

  const addPlotPoint = (point: string) => {
    setStory(prev => ({
      ...prev,
      plotPoints: [...prev.plotPoints, point],
      fullText: prev.fullText + "\n\n" + point
    }));
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderRef.current = new MediaRecorder(stream);
    recorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      setIsRecording(false);
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
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    }}>
      {/* QT Robot avec différentes expressions selon l'étape */}
      <div style={{ marginBottom: "2rem" }}>
        <QTRobot expression={currentStep === 4 ? "happy" : "neutral"} />
      </div>

      {!showFinalStory ? (
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          width: "100%"
        }}>
          {currentStep === 1 && (
            <>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Choisis ton thème</h2>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap"
              }}>
                {themes.map((theme, index) => (
                  <button
                    key={index}
                    onClick={() => handleThemeSelect(theme)}
                    style={{
                      padding: "1.5rem",
                      border: "none",
                      borderRadius: "12px",
                      backgroundColor: "#e0f2fe",
                      fontSize: "2rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ fontSize: "2.5rem" }}>{theme.icon}</span>
                    <span style={{ fontSize: "1rem", marginTop: "0.5rem" }}>{theme.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Crée tes personnages</h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="text"
                  placeholder="Nom du personnage"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      addCharacter(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                  style={{
                    padding: "0.8rem",
                    fontSize: "1rem",
                    border: "2px solid #bfdbfe",
                    borderRadius: "8px",
                    width: "100%",
                    maxWidth: "400px"
                  }}
                />
              </div>
              
              {story.characters.length > 0 && (
                <>
                  <p>Personnages:</p>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    justifyContent: "center",
                    margin: "1rem 0"
                  }}>
                    {story.characters.map((char, index) => (
                      <div key={index} style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#bfdbfe",
                        borderRadius: "20px"
                      }}>
                        {char}
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <button
                onClick={() => setCurrentStep(3)}
                disabled={story.characters.length === 0}
                style={{
                  padding: "0.8rem 1.5rem",
                  backgroundColor: story.characters.length > 0 ? "#3b82f6" : "#d1d5db",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  cursor: story.characters.length > 0 ? "pointer" : "not-allowed",
                  marginTop: "1rem"
                }}
              >
                Continuer
              </button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Construis ton histoire</h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem"
              }}>
                {currentTheme.prompts.map((prompt, index) => (
                  <div
                    key={index}
                    onClick={() => addPlotPoint(prompt + " : ")}
                    style={{
                      padding: "1rem",
                      backgroundColor: "#e0f2fe",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "2px dashed #bfdbfe"
                    }}
                  >
                    {prompt}
                  </div>
                ))}
              </div>
              
              <textarea
                value={story.fullText}
                onChange={(e) => setStory(prev => ({ ...prev, fullText: e.target.value }))}
                placeholder="Écris ton histoire ici..."
                style={{
                  width: "100%",
                  minHeight: "150px",
                  padding: "1rem",
                  border: "2px solid #bfdbfe",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  marginBottom: "1rem"
                }}
              />
              
              <div style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center"
              }}>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  style={{
                    padding: "0.8rem 1.5rem",
                    backgroundColor: isRecording ? "#ef4444" : "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer"
                  }}
                >
                  {isRecording ? "Arrêter l'enregistrement" : "Enregistrer mon histoire"}
                </button>
                
                <button
                  onClick={() => setShowFinalStory(true)}
                  disabled={!story.fullText}
                  style={{
                    padding: "0.8rem 1.5rem",
                    backgroundColor: story.fullText ? "#10b981" : "#d1d5db",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: story.fullText ? "pointer" : "not-allowed"
                  }}
                >
                  Voir mon histoire
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          width: "100%",
          textAlign: "left"
        }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", textAlign: "center" }}>Mon Histoire: {currentTheme.name}</h2>
          
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#3b82f6" }}>Personnages:</h3>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              margin: "0.5rem 0 1.5rem"
            }}>
              {story.characters.map((char, index) => (
                <div key={index} style={{
                  padding: "0.3rem 0.8rem",
                  backgroundColor: "#e0f2fe",
                  borderRadius: "20px"
                }}>
                  {char}
                </div>
              ))}
            </div>
            
            <h3 style={{ fontSize: "1.2rem", color: "#3b82f6" }}>Histoire:</h3>
            <div style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              margin: "1rem 0",
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "8px"
            }}>
              {story.fullText || "Aucun texte saisi"}
            </div>
          </div>
          
          <button
            onClick={() => {
              setShowFinalStory(false);
              setCurrentStep(1);
              setStory({
                title: "",
                characters: [],
                places: [],
                plotPoints: [],
                fullText: ""
              });
            }}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              display: "block",
              margin: "0 auto"
            }}
          >
            Créer une nouvelle histoire
          </button>
        </div>
      )}
      
      <Link href="/" style={{
        marginTop: "2rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#1e293b",
        color: "white",
        borderRadius: "9999px",
        textDecoration: "none",
        fontSize: "1rem"
      }}>
        Retour à l'accueil
      </Link>
    </div>
  );
}