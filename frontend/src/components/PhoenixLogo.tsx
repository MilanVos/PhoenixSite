"use client";

import { motion } from "framer-motion";

interface PhoenixLogoProps {
  size?: number;
  animated?: boolean;
}

export default function PhoenixLogo({ size = 48, animated = true }: PhoenixLogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="phoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <radialGradient id="phoenixGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#phoenixGlow)"
        animate={animated ? { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.path
        d="M50 15 C35 25, 30 40, 35 55 C25 50, 20 55, 25 65 C20 60, 15 65, 20 70 C30 80, 40 82, 50 80 C60 82, 70 80, 80 70 C85 65, 80 60, 75 65 C80 55, 75 50, 65 55 C70 40, 65 25, 50 15 Z"
        fill="url(#phoenixGrad)"
        animate={animated ? { scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 50%" }}
      />

      <path
        d="M50 25 C45 30, 43 38, 46 45 L50 42 L54 45 C57 38, 55 30, 50 25 Z"
        fill="#fbbf24"
        opacity="0.9"
      />

      <circle cx="46" cy="48" r="1.5" fill="#080808" />
      <circle cx="54" cy="48" r="1.5" fill="#080808" />
    </motion.svg>
  );
}
