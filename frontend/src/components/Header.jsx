import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

const LOGO_LIGHT = "https://customer-assets.emergentagent.com/job_cargo-logistics-25/artifacts/pqp95swc_logo-color.png";
const LOGO_DARK = "https://customer-assets.emergentagent.com/job_cargo-logistics-25/artifacts/kj1z9fii_logo-white.png";

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
        className={`fixed top-3 md:top-5 inset-x-3 md:inset-x-6 z-50 transition-all duration-500 rounded-full ${
          scrolled ? "glass-strong ring-fluid" : "glass ring-fluid"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
          <button
            data-testid="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <img
              src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT}
              alt="XPDC Group"
              className="h-9 md:h-10 w-auto object-contain"
            />
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
            className="fixed top-20 inset-x-3 z-40 lg:hidden glass-strong ring-fluid rounded-3xl"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  data-testid={`mobile-nav-${item.id}`}
                  onClick={() => go(item.id)}
                  className="text-left py-3 border-b border-border/40 font-display text-2xl"
                >
                  {item.label}
                </button>
              ))}
              <button
                data-testid="mobile-get-quote"
                onClick={() => {
                  onOpenInquiry?.();
                  setMobileOpen(false);
                }}
                className="mt-4 h-12 rounded-full bg-primary text-primary-foreground font-medium inline-flex items-center justify-center gap-2"
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
