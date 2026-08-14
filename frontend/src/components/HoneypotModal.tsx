"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaUser, FaXmark } from "react-icons/fa6";

interface HoneypotModalProps {
  onClose: () => void;
}

export default function HoneypotModal({ onClose }: HoneypotModalProps) {
  const [triggered, setTriggered] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShake(true);
    setTimeout(() => setShake(false), 600);
    setTimeout(() => setTriggered(true), 400);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={shake
            ? { opacity: 1, scale: 1, y: 0, x: [-8, 8, -8, 8, -4, 4, 0] }
            : { opacity: 1, scale: 1, y: 0, x: 0 }
          }
          transition={{ duration: shake ? 0.4 : 0.3 }}
          className="w-full max-w-sm glass rounded-2xl overflow-hidden"
        >
          {!triggered ? (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Admin Login</h2>
                <button onClick={onClose} className="text-ash-400 hover:text-white transition-colors">
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-ash-400 mb-1.5">Gebruikersnaam</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-ash-500 text-xs" />
                    <input
                      type="text"
                      defaultValue="admin"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ash-400 mb-1.5">Wachtwoord</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ash-500 text-xs" />
                    <input
                      type="password"
                      defaultValue="admin123"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-phoenix-gradient text-white text-sm font-semibold hover:scale-105 transition-transform"
                >
                  Inloggen
                </button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="p-10 flex flex-col items-center text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
                className="text-6xl mb-5"
              >
                💀
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-black text-gradient-phoenix mb-3 leading-tight"
              >
                DACHT JE NOU SERIEUS DAT HET ZOU WERKEN
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-ash-400 text-sm mb-6"
              >
                Echt niet joh 😂
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={onClose}
                className="px-6 py-2 rounded-xl glass border border-white/10 text-ash-300 hover:text-white text-sm transition-colors"
              >
                Ga weg
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
