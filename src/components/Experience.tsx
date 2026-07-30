import { experiences } from "@/data/experience";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="02" title="Experience" />

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-8 border-b border-border last:border-b-0 group"
            >
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-muted transition-colors">
                  {exp.company}
                </h3>
                <p className="text-sm text-muted mt-1">{exp.role}</p>
                <p className="text-xs font-mono text-muted mt-2">
                  {exp.duration}
                </p>
              </div>

              <div>
                <p className="text-muted leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-muted border border-border rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
