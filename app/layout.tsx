import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { TimerProvider } from "@/app/context/TimerContext";


const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "QT Robot Math Tutor",
  description: "Learn Math with QT Robot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={fredoka.variable}>
      <body className="antialiased">
        <TimerProvider>
          <header
            style={{
              backgroundColor: "transparent",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                display: "inline-block",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                padding: "10px 20px",
                borderRadius: "20px",
                fontFamily: "'Fredoka', sans-serif",
                fontSize: "2rem",
                color: "#2b4a2e",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
              }}
            >
              QT Robot - Math Tutor
            </h1>
          </header>
          {children}
        </TimerProvider>
      </body>
    </html>
  );
}
