"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFire, FaStar } from "react-icons/fa6";
import ProjectCard from "@/components/ProjectCard";
import { api, Project } from "@/lib/api";

export default function ProjectenPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("Alle");

  useEffect(() => {
    api
      .getProjects()
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].sort();
  const filtered = filter === "Alle" ? projects : projects.filter((p) => p.technologies.includes(filter));

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
            <span className="text-xs text-phoenix-300">Mijn werk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-phoenix">Projecten</span>
          </h1>
          <p className="text-ash-400 max-w-2xl mx-auto">
            Een collectie van projecten die ik heb gebouwd en beheer. Filter op technologie om specifieke projecten te vinden.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-phoenix-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-ash-400 text-sm">Projecten laden...</p>
          </div>
        ) : (
          <>
            {allTechnologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center justify-center gap-2 mb-10"
              >
                <button
                  onClick={() => setFilter("Alle")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === "Alle"
                      ? "bg-phoenix-gradient text-white"
                      : "glass text-ash-300 hover:text-white"
                  }`}
                >
                  Alle
                </button>
                {allTechnologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setFilter(tech)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === tech
                        ? "bg-phoenix-gradient text-white"
                        : "glass text-ash-300 hover:text-white"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </motion.div>
            )}

            <div className="flex items-center gap-2 mb-6 text-sm text-ash-400">
              <FaStar className="text-phoenix-400" />
              <span>{filtered.length} project{filtered.length !== 1 ? "en" : ""}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-ash-400">Geen projecten gevonden voor {filter}.</p>
                <button
                  onClick={() => setFilter("Alle")}
                  className="mt-4 text-phoenix-400 hover:text-phoenix-300 text-sm font-medium"
                >
                  Toon alle projecten
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
