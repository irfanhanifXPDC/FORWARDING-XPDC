import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";

export default function ContactFooter({ onOpenInquiry }) {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      data-testid="contact-section"
      className="relative pt-28 md:pt-40 pb-10 md:pb-14 border-t border-border bg-background"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="h-px w-12 bg-primary" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {t.contact.eyebrow}
          </span>
        </div>

        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-display text-[18vw] md:text-[14vw] lg:text-[13rem] leading-[0.85] tracking-tighter text-foreground"
        >
          {t.contact.title}
        </motion.h2>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7 max-w-2xl">
            <p className="text-base md:text-lg text-muted-foreground text-balance">
              {t.contact.body}
            </p>

            <button
              data-testid="footer-get-quote"
              onClick={() => onOpenInquiry?.()}
              className="mt-8 inline-flex items-center gap-3 h-12 px-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium group shadow-[0_14px_40px_-14px_hsl(var(--primary)/0.55)] ring-fluid"
            >
              <span>{t.nav.getQuote}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
          </div>

          <div className="md:col-span-5 grid grid-cols-1 gap-5">
            <div className="rounded-3xl glass-card ring-fluid p-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {t.contact.addressLabel}
              </div>
              <p className="mt-3 text-sm md:text-base text-foreground leading-relaxed">
                Commercial Park ACP2 No. UG 16, RT.002/RW.007, Neglasari, Kec.
                Neglasari, Kota Tangerang, Banten 15129
              </p>
            </div>
            <div className="rounded-3xl glass-card ring-fluid p-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <Mail className="h-3.5 w-3.5 text-primary" />
                {t.contact.emailLabel}
              </div>
              <a
                href="mailto:halo@forwarding.xpdc.co.id"
                data-testid="contact-email"
                className="mt-3 inline-flex items-center gap-2 text-sm md:text-base text-foreground hover:text-primary transition-colors"
              >
                halo@forwarding.xpdc.co.id
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Ticker / divider */}
        <div className="mt-16 md:mt-24 relative overflow-hidden border-y border-border">
          <div className="ticker flex gap-12 py-5 whitespace-nowrap font-display text-3xl md:text-5xl text-foreground/30">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-12">
                Air Freight
                <span className="text-primary">·</span>
                FCL
                <span className="text-primary">·</span>
                LCL
                <span className="text-primary">·</span>
                Global Forwarding
                <span className="text-primary">·</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <div>
            © {year} XPDC Group · PT Xentra Platform Digital Cargo. {t.footer.rights}
          </div>
          <div>{t.footer.built}</div>
        </div>
      </div>
    </footer>
  );
}
