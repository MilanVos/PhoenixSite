import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phoenix | Portfolio",
  description: "Persoonlijke portfolio - talen, skills en projecten. Rising from the ashes of ordinary code.",
  keywords: ["portfolio", "developer", "phoenix", "projecten", "skills", "talen"],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body className={inter.className}>
        <AnimatedBackground />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
