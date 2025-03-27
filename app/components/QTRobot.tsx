"use client";
import { useEffect, useState } from "react";

interface QTRobotProps {
  expression: "afraid" | "angry" | "confused" | "cry" | "disgusted" | "happy" | "kiss" | "neutral" | "sad" | "scream" | "talking" | "yawn";
}

const QTRobot = ({ expression }: QTRobotProps) => {
  const [gifUrl, setGifUrl] = useState("/gifs/QT_QT_neutral.gif");

  useEffect(() => {
    switch (expression) {
      case "afraid":
        setGifUrl("/gifs/QT_QT_afraid.gif");
        break;
      case "angry":
        setGifUrl("/gifs/QT_QT_angry.gif");
        break;
      case "confused":
        setGifUrl("/gifs/QT_QT_confused.gif");
        break;
      case "cry":
        setGifUrl("/gifs/QT_QT_cry.gif");
        break;
      case "disgusted":
        setGifUrl("/gifs/QT_QT_disgusted.gif");
        break;
      case "happy":
        setGifUrl("/gifs/QT_QT_happy.gif");
        break;
      case "kiss":
        setGifUrl("/gifs/QT_QT_kiss.gif");
        break;
      case "sad":
        setGifUrl("/gifs/QT_QT_sad.gif");
        break;
      case "scream":
        setGifUrl("/gifs/QT_QT_scream.gif");
        break;
      case "talking":
        setGifUrl("/gifs/QT_QT_talking.gif");
        break;
      case "yawn":
        setGifUrl("/gifs/QT_QT_yawn.gif");
        break;
      default:
        setGifUrl("/gifs/QT_QT_neutral.gif");
        break;
    }
  }, [expression]);

  return (
    <div className="relative w-[300px] h-auto mb-8">
      <img
        src="https://docs.luxai.com/assets/images/qt_head-cd1f3ecbe79fb245a572462c68f363f1.png"
        alt="QTrobot Container"
        className="w-full h-auto"
      />
      <img
        src={gifUrl}
        alt="QT Robot Expression"
        className="absolute top-[81px] left-[43px] w-[210px] h-auto"
      />
    </div>
  );
};

export default QTRobot;