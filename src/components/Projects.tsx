import { projects } from "@/data/projects";
import SectionHeader from "./SectionHeader";

const badgeStyles: Record<string, string> = {
  Featured: "text-foreground border-foreground",
  Commissioned: "text-muted border-border",
};

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="03" title="Projects" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="border border-border rounded-2xl p-8 hover:bg-card transition-colors group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-4xl font-black text-border group-hover:text-muted transition-colors">
                  {project.name.charAt(0)}
                </span>
                {project.badge && (
                  <span
                    className={`text-xs font-mono border rounded-full px-3 py-1 ${badgeStyles[project.badge]}`}
                  >
                    {project.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">
                {project.name}
              </h3>
              <p className="text-sm text-muted font-mono mb-4">
                {project.category}
              </p>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-muted border border-border rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    className="text-sm font-medium text-foreground hover:text-muted transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted mt-12">
          More projects available on request
        </p>
      </div>
    </section>
  );
}
