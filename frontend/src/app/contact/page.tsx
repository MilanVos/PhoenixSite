"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFire, FaPaperPlane, FaCircleCheck, FaEnvelope, FaUser } from "react-icons/fa6";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await api.submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    }
  };

  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass border border-phoenix-500/20">
            <FaFire className="text-phoenix-500 text-sm" />
            <span className="text-xs text-phoenix-300">Neem contact op</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-phoenix">Contact</span>
          </h1>
          <p className="text-ash-400 max-w-2xl mx-auto">
            Heb je een vraag, een project idee of wil je gewoon hallo zeggen?
            Stuur me een bericht en ik kom terug op je.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-ash-300 mb-2">Naam</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-ash-500 text-sm" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-ash-950/50 border border-white/10 text-white placeholder-ash-500 focus:border-phoenix-500/50 focus:outline-none focus:ring-2 focus:ring-phoenix-500/20 transition-all"
                placeholder="Je naam"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ash-300 mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-ash-500 text-sm" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-ash-950/50 border border-white/10 text-white placeholder-ash-500 focus:border-phoenix-500/50 focus:outline-none focus:ring-2 focus:ring-phoenix-500/20 transition-all"
                placeholder="je@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ash-300 mb-2">Bericht</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-ash-950/50 border border-white/10 text-white placeholder-ash-500 focus:border-phoenix-500/50 focus:outline-none focus:ring-2 focus:ring-phoenix-500/20 transition-all resize-none"
              placeholder="Vertel me wat je op je hart ligt..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
            whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-phoenix-gradient text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === "sending" ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Versturen...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Verstuur bericht
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
              >
                <FaCircleCheck />
                <p className="text-sm">Bedankt voor je bericht! Ik kom zo snel mogelijk terug op je.</p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
              >
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>
  );
}
