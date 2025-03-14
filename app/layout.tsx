import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header style={{
          backgroundColor: "#f8f9f8",
          padding: "3px",
          textAlign: "center",
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          fontSize: "1.5rem",
          color: "white",
        }}>
          <h1>QT Robot - Math Tutor</h1>
        </header>
        {children}
      </body>
    </html>
  );
}