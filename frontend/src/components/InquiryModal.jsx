import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowUpRight, Plane, Ship, Container } from "lucide-react";
import { useApp } from "@/context/AppContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICE_TITLE_KEY = {
  "Air Freight": "titleAir",
  FCL: "titleFcl",
  LCL: "titleLcl",
};

const SERVICE_OPTIONS = [
  { value: "Air Freight", icon: Plane },
  { value: "FCL", icon: Ship },
  { value: "LCL", icon: Container },
];

const initial = {
  full_name: "",
  company: "",
  email: "",
  phone: "",
  origin: "",
  destination: "",
  cargo_type: "",
  weight: "",
  volume: "",
  ready_date: "",
  notes: "",
};

export default function InquiryModal({ open, onOpenChange, service }) {
  const { t } = useApp();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [activeService, setActiveService] = useState(service || "Air Freight");

  // Sync external service prop when modal opens
  useEffect(() => {
    if (open && service) setActiveService(service);
  }, [open, service]);

  const titleKey = SERVICE_TITLE_KEY[activeService] || "titleAir";

  const onChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const isValid =
    form.full_name.trim() &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.trim() &&
    form.origin.trim() &&
    form.destination.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error(t.inquiry.toastErrorTitle, {
        description: t.inquiry.validation,
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${API}/inquiry`,
        { service_type: activeService, ...form },
        { timeout: 20000 }
      );
      if (res?.data?.success) {
        toast.success(t.inquiry.toastSuccessTitle, {
          description: t.inquiry.toastSuccessBody,
        });
        setForm(initial);
        onOpenChange(false);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      toast.error(t.inquiry.toastErrorTitle, {
        description:
          err?.response?.data?.detail ||
          err?.message ||
          t.inquiry.toastErrorBody,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="inquiry-form-modal"
        className="max-w-2xl w-[calc(100vw-2rem)] bg-card/85 backdrop-blur-2xl border-border/60 rounded-3xl p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col shadow-[0_30px_80px_-20px_hsl(0_0%_0%/0.5)]"
      >
        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 shrink-0">
          <DialogHeader className="text-left space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                XPDC · INQUIRY
              </span>
            </div>
            <DialogTitle className="font-display text-2xl md:text-3xl leading-tight">
              {t.inquiry[titleKey]}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm md:text-base">
              {t.inquiry.subtitle}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable form body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 min-h-0 flex flex-col"
        >
          <div
            className="flex-1 min-h-0 overflow-y-auto px-6 md:px-8 pb-4 space-y-5"
            data-lenis-prevent
          >
            {/* Service segmented picker */}
            <div>
              <Label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {t.inquiry.fields.service || "Service"}
              </Label>
              <div
                role="radiogroup"
                className="mt-2 grid grid-cols-3 gap-2 p-1.5 rounded-full bg-secondary/60 border border-border/60"
                data-testid="inquiry-service-picker"
              >
                {SERVICE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const selected = activeService === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      data-testid={`inquiry-service-${opt.value
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      onClick={() => setActiveService(opt.value)}
                      className={`h-10 rounded-full inline-flex items-center justify-center gap-2 text-xs md:text-sm font-medium transition-all ${
                        selected
                          ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)]"
                          : "text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {opt.value}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label={t.inquiry.fields.name}
                testId="inquiry-name"
                required
                value={form.full_name}
                onChange={onChange("full_name")}
              />
              <Field
                label={t.inquiry.fields.company}
                testId="inquiry-company"
                value={form.company}
                onChange={onChange("company")}
              />
              <Field
                label={t.inquiry.fields.email}
                testId="inquiry-email"
                type="email"
                required
                value={form.email}
                onChange={onChange("email")}
              />
              <Field
                label={t.inquiry.fields.phone}
                testId="inquiry-phone"
                required
                value={form.phone}
                onChange={onChange("phone")}
              />
              <Field
                label={t.inquiry.fields.origin}
                testId="inquiry-origin"
                required
                value={form.origin}
                onChange={onChange("origin")}
              />
              <Field
                label={t.inquiry.fields.destination}
                testId="inquiry-destination"
                required
                value={form.destination}
                onChange={onChange("destination")}
              />
              <Field
                label={t.inquiry.fields.cargoType}
                testId="inquiry-cargo-type"
                value={form.cargo_type}
                onChange={onChange("cargo_type")}
              />
              <Field
                label={t.inquiry.fields.readyDate}
                testId="inquiry-ready-date"
                type="date"
                value={form.ready_date}
                onChange={onChange("ready_date")}
              />
              <Field
                label={t.inquiry.fields.weight}
                testId="inquiry-weight"
                type="number"
                value={form.weight}
                onChange={onChange("weight")}
              />
              <Field
                label={t.inquiry.fields.volume}
                testId="inquiry-volume"
                type="number"
                value={form.volume}
                onChange={onChange("volume")}
              />
            </div>

            <div>
              <Label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {t.inquiry.fields.notes}
              </Label>
              <Textarea
                data-testid="inquiry-notes"
                value={form.notes}
                onChange={onChange("notes")}
                rows={3}
                className="mt-2 rounded-2xl bg-background/60 border-border/60 focus-visible:ring-primary focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Sticky footer */}
          <div className="shrink-0 px-6 md:px-8 py-4 border-t border-border/40 bg-card/40 backdrop-blur-md flex flex-col-reverse md:flex-row md:items-center md:justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              data-testid="inquiry-cancel-btn"
              className="rounded-full"
            >
              {t.inquiry.cancel}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              data-testid="inquiry-submit-btn"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-6 min-w-[200px] inline-flex items-center justify-between gap-3 shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
            >
              {submitting ? (
                <>
                  <span>{t.inquiry.submitting}</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <span>{t.inquiry.submit}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, testId, required, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </Label>
      <Input
        data-testid={testId}
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-2xl bg-background/60 border-border/60 focus-visible:ring-primary focus-visible:ring-offset-0 h-11 px-4"
      />
    </div>
  );
}
