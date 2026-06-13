import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function ProcessSteps() {
  const { t } = useApp();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      data-testid="process-section"
      ref={ref}
      className="relative py-28 md:py-40"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {t.process.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-balance max-w-4xl">
            {t.process.title}
          </h2>
        </div>

        <div className="relative pl-10 md:pl-16">
          {/* Track */}
          <div className="absolute left-3 md:left-6 top-0 bottom-0 w-px bg-border" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-3 md:left-6 top-0 bottom-0 w-px bg-primary origin-top"
          />

          {t.process.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative py-10 md:py-14 border-b border-border last:border-b-0"
              data-testid={`process-step-${i}`}
            >
              <div className="absolute -left-[40px] md:-left-[60px] top-12 md:top-16 h-3 w-3 bg-background border-2 border-primary rounded-full" />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-2 font-mono text-sm md:text-base text-primary tracking-[0.2em]">
                  {s.n}
                </div>
                <h3 className="md:col-span-5 font-display text-3xl md:text-5xl leading-tight text-foreground">
                  {s.t}
                </h3>
                <p className="md:col-span-5 text-base md:text-lg text-muted-foreground md:pt-3 max-w-md">
                  {s.d}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
