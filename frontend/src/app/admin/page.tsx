"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock, FaUser, FaFire } from "react-icons/fa6";
import PhoenixLogo from "@/components/PhoenixLogo";
import { api } from "@/lib/api";
import { getToken, setToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (getToken()) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const { token } = await api.login(credentials.username, credentials.password);
      setToken(token);
      router.push("/admin/dashboard");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Inloggen mislukt");
    }
  };

  return (
    <div className="section-padding flex items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <PhoenixLogo size={64} />
            </div>
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-phoenix-500/10 border border-phoenix-500/20">
              <FaFire className="text-phoenix-500 text-sm" />
              <span className="text-xs text-phoenix-300">Admin paneel</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Inloggen</h1>
            <p className="text-sm text-ash-400 mt-1">Log in om je portfolio te beheren</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ash-300 mb-2">Gebruikersnaam</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-ash-500 text-sm" />
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-ash-950/50 border border-white/10 text-white placeholder-ash-500 focus:border-phoenix-500/50 focus:outline-none focus:ring-2 focus:ring-phoenix-500/20 transition-all"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ash-300 mb-2">Wachtwoord</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ash-500 text-sm" />
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-ash-950/50 border border-white/10 text-white placeholder-ash-500 focus:border-phoenix-500/50 focus:outline-none focus:ring-2 focus:ring-phoenix-500/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
              whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-phoenix-gradient text-white font-semibold shadow-lg disabled:opacity-50 transition-all"
            >
              {status === "loading" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Inloggen...
                </>
              ) : (
                "Inloggen"
              )}
            </motion.button>
          </form>

          <p className="text-xs text-ash-500 text-center mt-6">
            Standaard: admin / admin123 (verander dit in productie!)
          </p>
        </div>
      </motion.div>
    </div>
  );
}
