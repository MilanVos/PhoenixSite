import { configWorks } from "@/data/configWork";
import SectionHeader from "./SectionHeader";

export default function ConfigWork() {
  return (
    <section
      id="config-work"
      className="px-6 py-24 sm:py-32 border-t border-border"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="04" title="Configuration Work" />

        <p className="text-muted max-w-2xl mb-12 leading-relaxed">
          Custom interface designs, menu configurations, and visual systems
          crafted for optimal player experience.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {configWorks.map((work, i) => (
            <div
              key={i}
              className="border border-border rounded-xl p-6 hover:bg-card transition-colors"
            >
              <p className="text-xs font-mono text-muted mb-3">
                {work.category}
              </p>
              <h3 className="text-base font-semibold text-foreground">
                {work.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
