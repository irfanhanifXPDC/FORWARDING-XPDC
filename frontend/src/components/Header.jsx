import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

export default function Header({ onOpenInquiry }) {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "services", label: t.nav.services },
    { id: "about", label: t.nav.about },
    { id: "process", label: t.nav.process },
    { id: "tracking", label: t.nav.tracking },
    { id: "contact", label: t.nav.contact },
  ];

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 h-16 md:h-20 flex items-center justify-between">
          <button
            data-testid="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <span className="font-display text-xl md:text-2xl tracking-tight">
              <span className="text-primary">X</span>PDC
            </span>
            <span className="hidden md:inline-flex font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-l border-border pl-3">
              Group
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                data-testid={`nav-${item.id}`}
                onClick={() => go(item.id)}
                className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              data-testid="lang-toggle"
              onClick={toggleLang}
              className="h-9 px-3 inline-flex items-center font-mono text-[11px] uppercase tracking-[0.25em] border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Toggle language"
            >
              {lang.toUpperCase()}
              <span className="mx-1 text-muted-foreground">/</span>
              <span className="text-muted-foreground">
                {lang === "en" ? "ID" : "EN"}
              </span>
            </button>

            <button
              data-testid="theme-toggle"
              onClick={toggleTheme}
              className="h-9 w-9 inline-flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              data-testid="header-get-quote"
              onClick={() => onOpenInquiry?.("Air Freight")}
              className="hidden md:inline-flex items-center gap-2 h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              {t.nav.getQuote}
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center border border-border"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 inset-x-0 z-40 lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  data-testid={`mobile-nav-${item.id}`}
                  onClick={() => go(item.id)}
                  className="text-left py-3 border-b border-border/60 font-display text-2xl"
                >
                  {item.label}
                </button>
              ))}
              <button
                data-testid="mobile-get-quote"
                onClick={() => {
                  onOpenInquiry?.("Air Freight");
                  setMobileOpen(false);
                }}
                className="mt-4 h-12 bg-primary text-primary-foreground font-medium inline-flex items-center justify-center gap-2"
              >
                {t.nav.getQuote}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
