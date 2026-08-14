"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight, FaFire } from "react-icons/fa6";
import PhoenixLogo from "@/components/PhoenixLogo";
import ProjectCard from "@/components/ProjectCard";
import { api, Project, Language } from "@/lib/api";

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    api.getProjects().then((projects) => {
      setFeaturedProjects(projects.filter((p) => p.featured).slice(0, 3));
    }).catch(() => {});

    api.getLanguages().then(setLanguages).catch(() => {});
  }, []);

  return (
    <div className="section-padding">
      <section className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <PhoenixLogo size={120} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-phoenix-500/20"
        >
          <FaFire className="text-phoenix-500 text-sm animate-flame-flicker" />
          <span className="text-xs text-phoenix-300">Welkom bij mijn portfolio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="text-gradient-phoenix glow-text">Phoenix</span>
          <br />
          <span className="text-white">Portfolio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-ash-300 max-w-2xl mb-8"
        >
          Developer, creator en probleemoplosser. Ontdek welke talen ik spreek,
          welke projecten ik beheer en laat een bericht achter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/projecten"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-phoenix-gradient text-white font-semibold shadow-lg hover:shadow-phoenix-500/30 transition-all hover:scale-105"
          >
            Bekijk projecten
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/talen"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white font-semibold hover:border-phoenix-500/30 transition-all"
          >
            Mijn skills
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {languages.length > 0 && (
        <section className="max-w-7xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-gradient-phoenix">Talen & Skills</span>
            </h2>
            <p className="text-ash-400">Een overzicht van mijn technische vaardigheden</p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {languages.slice(0, 8).map((lang, i) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: lang.color || "#f97316" }}
                />
                <span className="text-sm text-white">{lang.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/talen"
              className="inline-flex items-center gap-2 text-phoenix-400 hover:text-phoenix-300 text-sm font-medium"
            >
              Bekijk alle skills
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </section>
      )}

      {featuredProjects.length > 0 && (
        <section className="max-w-7xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-gradient-phoenix">Uitgelichte Projecten</span>
            </h2>
            <p className="text-ash-400">Een selectie van mijn favoriete projecten</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 text-phoenix-400 hover:text-phoenix-300 text-sm font-medium"
            >
              Bekijk alle projecten
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
