"use client";

import { useEffect, useState } from "react";

export type QTRobotExpression =
  | "afraid"
  | "angry"
  | "confused"
  | "cry"
  | "disgusted"
  | "happy"
  | "kiss"
  | "neutral"
  | "sad"
  | "scream"
  | "talking"
  | "yawn";

interface QTRobotProps {
  expression: QTRobotExpression;
}

const QTRobot = ({ expression }: QTRobotProps) => {
  const [gifUrl, setGifUrl] = useState("/gifs/QT_QT_neutral.gif");

  useEffect(() => {
    const expressionsMap: Record<QTRobotExpression, string> = {
      afraid: "/gifs/QT_QT_afraid.gif",
      angry: "/gifs/QT_QT_angry.gif",
      confused: "/gifs/QT_QT_confused.gif",
      cry: "/gifs/QT_QT_cry.gif",
      disgusted: "/gifs/QT_QT_disgusted.gif",
      happy: "/gifs/QT_QT_happy.gif",
      kiss: "/gifs/QT_QT_kiss.gif",
      neutral: "/gifs/QT_QT_neutral.gif",
      sad: "/gifs/QT_QT_sad.gif",
      scream: "/gifs/QT_QT_scream.gif",
      talking: "/gifs/QT_QT_talking.gif",
      yawn: "/gifs/QT_QT_yawn.gif",
    };

    setGifUrl(expressionsMap[expression]);
  }, [expression]);

  return (
   <div className="relative w-[200px] h-auto mb-8">
  <img
    src="images/QT BoDy.png"
    alt="QTrobot animation"
    className="w-full h-auto"
  />

            <img
        src={gifUrl}
        alt={`QT Robot Expression - ${expression}`}
        className="absolute top-[42px] left-[55px] w-[115px] h-auto rounded-xl"
      />

    </div>
  );
};

export default QTRobot;
