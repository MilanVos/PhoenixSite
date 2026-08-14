"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Ember {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export default function AnimatedBackground() {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    const newEmbers: Ember[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 5,
    }));
    setEmbers(newEmbers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-phoenix-radial" />

      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #f97316, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #dc2626, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full"
          style={{
            left: `${ember.x}%`,
            bottom: "-10px",
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            background: "radial-gradient(circle, #fbbf24, #f97316)",
            boxShadow: "0 0 8px rgba(249, 115, 22, 0.6)",
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 0.8, 0],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
