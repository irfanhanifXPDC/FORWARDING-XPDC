import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const { t } = useApp();
  const items = t.testimonials.items;
  const loop = [...items, ...items];

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-primary" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {t.testimonials.eyebrow}
          </span>
        </div>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl text-balance"
        >
          {t.testimonials.title}
        </motion.h2>
      </div>

      <div className="relative no-scrollbar overflow-hidden">
        <div className="marquee-track flex gap-5 md:gap-8 w-max">
          {loop.map((c, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[460px] shrink-0 glass p-7 md:p-9"
              data-testid={`testimonial-${i}`}
            >
              <Quote className="h-6 w-6 text-primary" />
              <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-foreground text-balance">
                “{c.q}”
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {c.a}
              </p>
            </div>
          ))}
        </div>
        {/* edge gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
