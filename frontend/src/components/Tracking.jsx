import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Search, ArrowUpRight, Loader2, PackageSearch } from "lucide-react";

export default function Tracking() {
  const { t } = useApp();
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handle = (e) => {
    e.preventDefault();
    if (!val.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      // Mock: any value with length > 4 returns success
      if (val.trim().length > 4) {
        setResult(t.tracking.mockStatus);
      } else {
        setError(t.tracking.notFound);
      }
    }, 1100);
  };

  return (
    <section
      id="tracking"
      data-testid="tracking-section"
      className="relative py-28 md:py-40"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {t.tracking.eyebrow}
            </span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95]"
          >
            {t.tracking.title}
          </motion.h2>

          <form
            onSubmit={handle}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-2 p-2 rounded-full glass ring-fluid focus-within:ring-2 focus-within:ring-primary/40 transition-all"
          >
            <div className="flex-1 flex items-center px-5 gap-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                data-testid="tracking-input"
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder={t.tracking.placeholder}
                className="w-full h-12 bg-transparent text-base placeholder:text-muted-foreground/70 outline-none"
              />
            </div>
            <button
              data-testid="tracking-submit"
              type="submit"
              disabled={loading}
              className="h-12 px-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 font-medium disabled:opacity-70 shadow-[0_14px_40px_-14px_hsl(var(--primary)/0.55)]"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>{t.tracking.cta}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            {t.tracking.helper}
          </p>

          {(result || error) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-5 rounded-3xl glass ring-fluid border ${
                error ? "border-destructive/40" : "border-primary/40"
              } text-left flex items-start gap-3`}
              data-testid="tracking-result"
            >
              <PackageSearch
                className={`h-5 w-5 mt-0.5 ${
                  error ? "text-destructive" : "text-primary"
                }`}
              />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Ref · {val}
                </div>
                <div
                  className={`mt-1 text-sm md:text-base ${
                    error ? "text-destructive" : "text-foreground"
                  }`}
                >
                  {error || result}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
