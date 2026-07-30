import { testimonials } from "@/data/testimonials";
import SectionHeader from "./SectionHeader";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="px-6 py-24 sm:py-32 border-t border-border"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="05" title="Testimonials" />

        <div className="space-y-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="border border-border rounded-2xl p-8 sm:p-12"
            >
              <p className="text-4xl text-border font-black leading-none mb-4">
                &ldquo;
              </p>
              <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-8">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-sm font-bold text-foreground">
                  {testimonial.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
