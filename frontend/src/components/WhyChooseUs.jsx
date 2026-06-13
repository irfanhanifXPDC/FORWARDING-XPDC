import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function WhyChooseUs() {
  const { t } = useApp();

  return (
    <section
      id="why"
      data-testid="why-section"
      className="relative py-28 md:py-40"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {t.why.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-balance">
              {t.why.title}
            </h2>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {t.why.items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              className="bg-background p-6 md:p-10 group"
              data-testid={`why-stat-${i}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  / 0{i + 1}
                </span>
                <span className="block h-1 w-1 bg-primary rounded-full" />
              </div>
              <div className="mt-10 font-display text-5xl md:text-7xl text-foreground leading-none group-hover:text-primary transition-colors duration-500">
                {item.k}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{item.v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
