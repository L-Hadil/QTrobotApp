"use client";

import dynamic from "next/dynamic";

// Charger QTRobot uniquement côté client
const QTRobot = dynamic(() => import("@/app/components/QTRobot"), { ssr: false });

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <QTRobot />
    </div>
  );
}
