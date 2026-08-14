import { profile } from "@/data/profile";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="01" title="About" />

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-3xl leading-tight mb-10">
          {profile.about.heading}
        </h3>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {profile.about.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-xs font-mono text-muted mb-4 tracking-widest">
                STACK
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-mono text-foreground border border-border rounded-md px-3 py-1.5 hover:bg-card transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-mono text-muted mb-3 tracking-widest">
                OPEN TO WORK
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {profile.openToWork}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
