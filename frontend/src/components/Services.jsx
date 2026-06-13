import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Plane, Ship, Container, ArrowUpRight, Check } from "lucide-react";

const cards = [
  {
    key: "air",
    icon: Plane,
    testId: "air-freight-inquiry-btn",
    span: "md:col-span-7 md:row-span-2",
    height: "min-h-[480px] md:min-h-[560px]",
  },
  {
    key: "fcl",
    icon: Ship,
    testId: "fcl-inquiry-btn",
    span: "md:col-span-5",
    height: "min-h-[320px]",
  },
  {
    key: "lcl",
    icon: Container,
    testId: "lcl-inquiry-btn",
    span: "md:col-span-5",
    height: "min-h-[320px]",
  },
];

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function Services({ onOpenInquiry }) {
  const { t } = useApp();

  const dataFor = (key) => ({
    name: t.services[key].name,
    tag: t.services[key].tag,
    body: t.services[key].body,
    bullets: [t.services[key].b1, t.services[key].b2, t.services[key].b3],
    cta: t.services[key].cta,
  });

  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-28 md:py-40"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="h-px w-12 bg-primary" />
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.services.eyebrow}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7 font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-balance"
          >
            {t.services.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="md:col-span-5 text-base md:text-lg text-muted-foreground md:pt-3"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* Bento Tetris */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {cards.map((c, i) => {
            const d = dataFor(c.key);
            const Icon = c.icon;
            return (
              <motion.div
                key={c.key}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-3xl glass-card ring-fluid hover-lift group ${c.span} ${c.height}`}
              >
                {/* Inner */}
                <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        / 0{i + 1}
                      </span>
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-primary">
                        {d.tag}
                      </span>
                    </div>
                    <div className="mt-6 md:mt-8 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-background/40 border border-border/60 inline-flex items-center justify-center text-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="mt-6 font-display text-3xl md:text-5xl text-foreground leading-[0.95]">
                      {d.name}
                    </h3>
                    <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-md">
                      {d.body}
                    </p>

                    <ul className="mt-6 space-y-2">
                      {d.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm text-foreground/80"
                        >
                          <Check
                            className="h-4 w-4 mt-0.5 text-primary shrink-0"
                            strokeWidth={2}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    data-testid={c.testId}
                    onClick={() =>
                      onOpenInquiry?.(
                        c.key === "air" ? "Air Freight" : c.key.toUpperCase()
                      )
                    }
                    className="mt-8 inline-flex items-center justify-between w-full md:w-auto md:min-w-[260px] h-12 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group/cta shadow-[0_14px_40px_-14px_hsl(var(--primary)/0.6)] ring-fluid"
                  >
                    <span className="font-medium text-sm">{d.cta}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:rotate-45" />
                  </button>
                </div>

                {/* Decorative ghost number */}
                <div
                  className="pointer-events-none absolute -right-4 -bottom-10 font-display text-[18rem] leading-none text-foreground/5 select-none"
                  aria-hidden
                >
                  0{i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
