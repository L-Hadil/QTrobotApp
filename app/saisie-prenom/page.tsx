"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SaisiePrenom() {
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prenom.trim() && age.trim()) {
      localStorage.setItem("prenom", prenom.trim());
      localStorage.setItem("age", age.trim());
      router.push("/selection-niveau");
    }
  };

  return (
    <div style={{
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
    }}>
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "2rem",
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        backdropFilter: "blur(4px)",
        textAlign: "center",
        maxWidth: "90%",
        width: "350px",
      }}>
        <h1 style={{
          fontSize: "2rem",
          marginBottom: "1.5rem",
          color: "#2e7d32",
          fontFamily: "'Comic Sans MS', cursive"
        }}>
          Comment tu t’appelles ?
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Ton prénom"
            style={{
              padding: "12px",
              fontSize: "1.2rem",
              borderRadius: "10px",
              border: "2px solid #66bb6a",
              marginBottom: "1rem",
              width: "100%",
              textAlign: "center",
              outline: "none",
              color: "black",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            required
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Ton âge"
            style={{
              padding: "12px",
              fontSize: "1.2rem",
              borderRadius: "10px",
              border: "2px solid #66bb6a",
              marginBottom: "1.5rem",
              width: "100%",
              textAlign: "center",
              outline: "none",
              color: "black",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            min={3}
            max={12}
            required
          />
          <br />
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#43a047",
              color: "white",
              borderRadius: "10px",
              fontSize: "1.2rem",
              cursor: "pointer",
              border: "none",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
          >
            Commencer l’aventure
          </button>
        </form>
      </div>
    </div>
  );
}
