import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function Preloader({ onDone }) {
  const { t } = useApp();
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef();

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1800;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.floor(eased * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onDone?.();
        }, 350);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* Curtain split */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-background origin-top"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: pct >= 100 ? 0 : 1 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1], delay: 0.35 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-background origin-bottom"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: pct >= 100 ? 0 : 1 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1], delay: 0.35 }}
          />

          {/* Center content */}
          <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-12 lg:px-24 flex flex-col">
            <div className="flex items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono">
              <span data-testid="preloader-tag">XPDC GROUP</span>
              <span>{t.preloader.tag}</span>
            </div>

            <div className="mt-12 md:mt-16 flex items-end justify-between">
              <motion.div
                className="font-display text-foreground"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <div className="text-[14vw] leading-[0.85] font-mono text-primary tabular-nums">
                  {String(pct).padStart(3, "0")}
                </div>
              </motion.div>
              <div className="hidden md:flex flex-col items-end text-right">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono">
                  Loading
                </span>
                <span className="font-display text-2xl mt-2 text-foreground">
                  PT Xentra Platform<br />Digital Cargo
                </span>
              </div>
            </div>

            <div className="mt-10 h-px w-full bg-border relative overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono">
              <span>Sea · Air · Land</span>
              <span>v1.0 · 2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
