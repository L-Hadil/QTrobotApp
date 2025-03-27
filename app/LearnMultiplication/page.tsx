"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function MultiplicationTable() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [checkedNumbers, setCheckedNumbers] = useState<number[]>([]);

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);
  };

  const toggleCheckNumber = (num: number) => {
    if (checkedNumbers.includes(num)) {
      setCheckedNumbers(checkedNumbers.filter(n => n !== num));
    } else {
      setCheckedNumbers([...checkedNumbers, num]);
    }
  };

  // Determine robot expression based on interaction
  const getRobotExpression = () => {
    if (checkedNumbers.length > 0) return "happy";
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
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    }}>
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
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Select a Number</h2>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center"
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <button
                  key={num}
                  onClick={() => handleNumberSelect(num)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: selectedNumber === num ? "#3b82f6" : "#e5e7eb",
                    color: selectedNumber === num ? "white" : "black",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {num}
                </button>
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
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
            Multiplication Table
          </h1>
          
          {selectedNumber ? (
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                Table of {selectedNumber}
              </h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(multiplier => (
                    <tr key={multiplier}>
                      <td style={{ 
                        padding: "0.5rem",
                        textAlign: "right",
                        borderBottom: "1px solid #e5e7eb"
                      }}>
                        {selectedNumber} × {multiplier} =
                      </td>
                      <td style={{ 
                        padding: "0.5rem",
                        textAlign: "left",
                        borderBottom: "1px solid #e5e7eb"
                      }}>
                        {selectedNumber * multiplier}
                      </td>
                      <td style={{ padding: "0.5rem" }}>
                        <input
                          type="checkbox"
                          checked={checkedNumbers.includes(multiplier)}
                          onChange={() => toggleCheckNumber(multiplier)}
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ fontSize: "1.2rem", color: "#6b7280" }}>
              Select a number from 1 to 10 to see its multiplication table
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
        Back to Home
      </Link>
    </div>
  );
}