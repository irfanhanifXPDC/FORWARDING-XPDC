import React, { useState } from "react";
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
import { Loader2, ArrowUpRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICE_TITLE_KEY = {
  "Air Freight": "titleAir",
  FCL: "titleFcl",
  LCL: "titleLcl",
};

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

  const titleKey = SERVICE_TITLE_KEY[service] || "titleAir";

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
        { service_type: service, ...form },
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
        className="max-w-2xl bg-card border-border rounded-none p-0 overflow-hidden"
      >
        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-2">
          <DialogHeader className="text-left space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                XPDC · INQUIRY
              </span>
            </div>
            <DialogTitle className="font-display text-3xl md:text-4xl leading-tight">
              {t.inquiry[titleKey]}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t.inquiry.subtitle}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-6 md:px-8 pb-6 md:pb-8 pt-4 max-h-[70vh] overflow-y-auto"
        >
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

          <div className="mt-4">
            <Label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {t.inquiry.fields.notes}
            </Label>
            <Textarea
              data-testid="inquiry-notes"
              value={form.notes}
              onChange={onChange("notes")}
              rows={4}
              className="mt-2 rounded-none bg-background border-border focus-visible:ring-primary"
            />
          </div>

          <div className="mt-8 flex flex-col-reverse md:flex-row md:items-center md:justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              data-testid="inquiry-cancel-btn"
              className="rounded-none"
            >
              {t.inquiry.cancel}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              data-testid="inquiry-submit-btn"
              className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-6 min-w-[200px] inline-flex items-center justify-between gap-3"
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
        className="rounded-none bg-background border-border focus-visible:ring-primary h-11"
      />
    </div>
  );
}
