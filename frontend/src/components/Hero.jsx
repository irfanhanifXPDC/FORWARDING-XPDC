import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero({ onOpenInquiry }) {
  const { t } = useApp();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[100svh] flex flex-col justify-end pb-16 pt-32 md:pt-40 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 md:mb-12">
          <span className="h-px w-12 bg-primary" />
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.hero.eyebrow}
          </span>
        </div>

        {/* Massive headline */}
        <div className="font-display leading-[0.85] tracking-tight">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
            className="text-[14vw] md:text-[10vw] lg:text-[9.5rem] font-light text-foreground"
          >
            {t.hero.title1}
          </motion.h1>
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.25 }}
            className="text-[14vw] md:text-[10vw] lg:text-[9.5rem] font-semibold text-stroke dark:text-stroke -mt-2 md:-mt-4"
          >
            {t.hero.title2}
          </motion.h2>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="md:col-span-6 lg:col-span-5 text-base md:text-lg text-muted-foreground max-w-xl text-balance"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="md:col-span-6 lg:col-span-7 flex flex-col md:flex-row gap-3 md:justify-end"
          >
            <button
              data-testid="hero-cta-services"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center justify-between gap-4 h-14 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors min-w-[220px]"
            >
              <span className="font-medium">{t.hero.cta1}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
            <button
              data-testid="hero-cta-tracking"
              onClick={() => document.getElementById("tracking")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center justify-between gap-4 h-14 px-6 border border-foreground/40 hover:border-foreground text-foreground transition-colors min-w-[220px]"
            >
              <span className="font-medium">{t.hero.cta2}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-14 md:mt-20 grid grid-cols-3 gap-4 md:gap-10 border-t border-border pt-6"
        >
          {[
            { k: "120+", v: t.hero.stat1 },
            { k: "85K", v: t.hero.stat2 },
            { k: "03–14", v: t.hero.stat3 },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="font-display text-3xl md:text-5xl text-foreground">
                {s.k}
              </div>
              <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 right-6 md:right-12 lg:right-24 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>Scroll</span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </motion.div>
    </section>
  );
}
