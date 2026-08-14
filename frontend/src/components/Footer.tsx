"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import PhoenixLogo from "./PhoenixLogo";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative z-10 glass border-t border-white/5 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <PhoenixLogo size={32} />
            <div>
              <p className="text-sm font-bold text-gradient-phoenix">Phoenix Portfolio</p>
              <p className="text-xs text-ash-400">Rising from the ashes of ordinary code</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              className="text-ash-400 hover:text-phoenix-400 transition-colors text-xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-ash-400 hover:text-phoenix-400 transition-colors text-xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="/contact"
              className="text-ash-400 hover:text-phoenix-400 transition-colors text-xl"
              aria-label="Email"
            >
              <FaEnvelope />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-ash-500">
            &copy; {new Date().getFullYear()} Phoenix Portfolio.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
