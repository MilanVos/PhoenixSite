"use client";

import { motion } from "framer-motion";
import { FaGithub, FaArrowUpRightFromSquare, FaStar } from "react-icons/fa6";
import type { Project } from "@/lib/api";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="glass glass-hover rounded-2xl p-6 group relative overflow-hidden"
    >
      {project.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-phoenix-400 bg-phoenix-500/10 px-2 py-1 rounded-full border border-phoenix-500/20">
          <FaStar className="text-[10px]" />
          <span>Uitgelicht</span>
        </div>
      )}

      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl bg-phoenix-gradient flex items-center justify-center text-white font-bold text-lg mb-3">
          {project.title.charAt(0)}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-phoenix-400 transition-colors">
          {project.title}
        </h3>
      </div>

      <p className="text-ash-300 text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded-md bg-white/5 text-ash-300 border border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ash-400 hover:text-phoenix-400 transition-colors flex items-center gap-1.5 text-sm"
          >
            <FaGithub /> Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ash-400 hover:text-phoenix-400 transition-colors flex items-center gap-1.5 text-sm"
          >
            <FaArrowUpRightFromSquare /> Live
          </a>
        )}
      </div>
    </motion.div>
  );
}
