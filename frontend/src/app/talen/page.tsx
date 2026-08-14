"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaScrewdriverWrench, FaFire } from "react-icons/fa6";
import SkillBadge from "@/components/SkillBadge";
import { api, Language } from "@/lib/api";

const categoryIcons: Record<string, ReactNode> = {
  Frontend: <FaCode />,
  Backend: <FaServer />,
  Database: <FaDatabase />,
  DevOps: <FaScrewdriverWrench />,
  Tools: <FaScrewdriverWrench />,
};

export default function TalenPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getLanguages()
      .then(setLanguages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(languages.map((l) => l.category))];

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-phoenix-500/20">
            <FaFire className="text-phoenix-500 text-sm" />
            <span className="text-xs text-phoenix-300">Technische vaardigheden</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-phoenix">Talen & Skills</span>
          </h1>
          <p className="text-ash-400 max-w-2xl mx-auto">
            Een overzicht van de programmeertalen, frameworks en tools die ik gebruik.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-phoenix-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-ash-400 text-sm">Skills laden...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category, catIndex) => {
              const categoryLangs = languages.filter((l) => l.category === category);
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-phoenix-gradient flex items-center justify-center text-white">
                      {categoryIcons[category] || <FaCode />}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{category}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-phoenix-500/30 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryLangs.map((lang, i) => (
                      <SkillBadge key={lang.id} language={lang} index={i} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
