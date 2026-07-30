"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import SectionHeader from "./SectionHeader";

const socialLinks = [
  { label: "Discord", value: profile.socials.discord, href: "#" },
  { label: "GitHub", value: profile.socials.github, href: "#" },
  {
    label: "Email",
    value: profile.socials.email,
    href: `mailto:${profile.socials.email}`,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  return (
    <section id="contact" className="px-6 py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="06" title="Contact" />

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Let&rsquo;s build something together
        </h3>

        <p className="text-muted max-w-xl mb-12 leading-relaxed">
          Have a project in mind? Looking for a reliable developer for your
          Minecraft server? I&rsquo;d love to hear from you.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="block border border-border rounded-xl p-6 hover:bg-card transition-colors group"
              >
                <p className="text-xs font-mono text-muted mb-2 tracking-widest">
                  {social.label}
                </p>
                <p className="text-lg font-semibold text-foreground group-hover:text-muted transition-colors">
                  {social.value}
                </p>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono text-muted mb-2 tracking-widest"
              >
                NAME
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono text-muted mb-2 tracking-widest"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono text-muted mb-2 tracking-widest"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-12 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-500">
                Message sent! I&rsquo;ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-500">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
