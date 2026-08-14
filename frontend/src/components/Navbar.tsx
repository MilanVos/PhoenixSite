"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaLock } from "react-icons/fa6";
import PhoenixLogo from "./PhoenixLogo";
import HoneypotModal from "./HoneypotModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/talen", label: "Talen & Skills" },
  { href: "/projecten", label: "Projecten" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [honeypotOpen, setHoneypotOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <PhoenixLogo size={36} />
              <span className="text-lg font-bold text-gradient-phoenix group-hover:scale-105 transition-transform">
                Phoenix
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive
                        ? "text-phoenix-400"
                        : "text-ash-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 rounded-lg bg-phoenix-500/10 border border-phoenix-500/20"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}

              <button
                onClick={() => setHoneypotOpen(true)}
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ash-500 hover:text-ash-300 border border-white/5 hover:border-white/10 transition-all"
              >
                <FaLock className="text-[10px]" />
                Admin
              </button>
            </div>

            <button
              className="md:hidden text-ash-300 hover:text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden glass border-t border-white/5"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "text-phoenix-400 bg-phoenix-500/10"
                          : "text-ash-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <button
                  onClick={() => { setMobileOpen(false); setHoneypotOpen(true); }}
                  className="w-full text-left px-4 py-3 text-sm font-medium rounded-lg text-ash-500 hover:text-ash-300 hover:bg-white/5 flex items-center gap-2 transition-colors"
                >
                  <FaLock className="text-xs" /> Admin
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {honeypotOpen && <HoneypotModal onClose={() => setHoneypotOpen(false)} />}
    </>
  );
}
