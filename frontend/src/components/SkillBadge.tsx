"use client";

import { motion } from "framer-motion";
import type { Language } from "@/lib/api";

const levelWidths: Record<string, number> = {
  Beginneling: 25,
  Beginner: 25,
  Gevorderd: 60,
  Geavanceerd: 90,
  Expert: 100,
};

export default function SkillBadge({ language, index }: { language: Language; index: number }) {
  const width = levelWidths[language.level] ?? 50;
  const color = language.color || "#f97316";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="glass glass-hover rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
          />
          <span className="text-sm font-semibold text-white">{language.name}</span>
        </div>
        <span className="text-xs text-ash-400">{language.level}</span>
      </div>

      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.2, ease: "easeOut" }}
        />
      </div>

      <p className="text-xs text-ash-500 mt-2">{language.category}</p>
    </motion.div>
  );
}
