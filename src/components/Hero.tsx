import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-16"
    >
      <div className="mx-auto max-w-6xl w-full">
        {profile.available && (
          <div className="mb-8 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-muted border border-border rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Available for projects
            </span>
          </div>
        )}

        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-foreground leading-none mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          {profile.name}
        </h1>

        <p
          className="text-lg sm:text-xl text-muted font-mono mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          {profile.title}
        </p>

        <p
          className="text-base sm:text-lg text-muted max-w-xl mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          {profile.tagline}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 mb-20 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-muted transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-card transition-colors"
          >
            Get in Touch
          </a>
        </div>

        <div
          className="grid grid-cols-3 gap-8 max-w-lg animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-black text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-muted">Scroll</span>
        <div className="w-px h-12 bg-border overflow-hidden relative">
          <div className="w-px h-4 bg-foreground animate-scroll" />
        </div>
      </div>
    </section>
  );
}
