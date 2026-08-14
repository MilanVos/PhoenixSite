"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      exit={{
        opacity: 0,
        y: -20,
        filter: "blur(8px)",
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}
