import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function About() {
  const { t } = useApp();

  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-28 md:py-40 lg:py-48"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="flex items-center gap-3 mb-10 md:mb-14"
        >
          <span className="h-px w-12 bg-primary" />
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.about.eyebrow}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-8 font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-foreground text-balance"
          >
            {t.about.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="md:col-span-4 text-base md:text-lg text-muted-foreground text-pretty md:pt-2"
          >
            {t.about.body}
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-16 md:mt-24 bg-border">
          {[
            { n: "01", t: t.about.pillar1Title, d: t.about.pillar1Body },
            { n: "02", t: t.about.pillar2Title, d: t.about.pillar2Body },
            { n: "03", t: t.about.pillar3Title, d: t.about.pillar3Body },
          ].map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground tracking-[0.25em]">
                  {p.n}
                </span>
                <span className="h-px w-8 bg-foreground/30 group-hover:bg-primary group-hover:w-16 transition-all duration-500" />
              </div>
              <h3 className="mt-8 font-display text-2xl md:text-3xl text-foreground">
                {p.t}
              </h3>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                {p.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
