"use client";
import { useEffect, useState } from "react";

interface QTRobotProps {
  expression: "happy" | "confused"| "sad" | "neutral";
}

const QTRobot = ({ expression }: QTRobotProps) => {
  const [gifUrl, setGifUrl] = useState("/gifs/QT_QT_neutral.gif");

  useEffect(() => {
    switch (expression) {
        case "happy":
          setGifUrl("/gifs/QT_QT_happy.gif");
          break;
        case "confused":
          setGifUrl("/gifs/QT_QT_confused.gif");
          break;
        case "sad":
          setGifUrl("/gifs/QT_QT_sad.gif");
          break;
        default:
          setGifUrl("/gifs/QT_QT_neutral.gif");
          break;
      }
  }, [expression]);

  return (
    <div className="relative w-[300px] h-auto mb-8">
      {/* Image statique (coque du robot) */}
      <img
        src="https://docs.luxai.com/assets/images/qt_head-cd1f3ecbe79fb245a572462c68f363f1.png"
        alt="QTrobot Container"
        className="w-full h-auto"
      />
      {/* Gif superposé (yeux et expressions) */}
      <img
        src={gifUrl}
        alt="QT Robot Expression"
        className="absolute top-[81px] left-[43px] w-[210px] h-auto"
      />
    </div>
  );
};

export default QTRobot;