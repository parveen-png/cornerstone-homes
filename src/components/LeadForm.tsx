"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import {
  CONSENT_TEXT,
  CONSENT_TEXT_VERSION,
  CTA,
  FORM_VERSION,
  PAGE_VERSION,
} from "@/data/project";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  consent: boolean;
  companyWebsite: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  consent: false,
  companyWebsite: "",
};

type LeadFormProps = {
  id: string;
  heading?: string;
  compact?: boolean;
};

function readAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    landingPageUrl: window.location.href,
    pageVersion: PAGE_VERSION,
    referrer: document.referrer || "",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
    gclid: params.get("gclid") || "",
    wbraid: params.get("wbraid") || "",
    gbraid: params.get("gbraid") || "",
    msclkid: params.get("msclkid") || "",
    fbclid: params.get("fbclid") || "",
    ttclid: params.get("ttclid") || "",
    liFatId: params.get("li_fat_id") || "",
    formVersion: FORM_VERSION,
    consentTextVersion: CONSENT_TEXT_VERSION,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function LeadForm({ id, heading = CTA.primary, compact = false }: LeadFormProps) {
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const started = useRef(false);

  function markStart() {
    if (started.current) return;
    started.current = true;
    trackEvent(ANALYTICS_EVENTS.formStart, { form_id: id });
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setServerMessage("");
    trackEvent(ANALYTICS_EVENTS.formSubmitAttempt, { form_id: id });

    const payload = {
      ...values,
      consent: values.consent ? true : undefined,
      consentTimestamp: new Date().toISOString(),
      ...readAttribution(),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        const fieldErrors = data.fieldErrors ?? {};
        setErrors(fieldErrors);
        Object.keys(fieldErrors).forEach((field) => {
          trackEvent(ANALYTICS_EVENTS.formFieldError, { form_id: id, field });
        });
        setStatus("error");
        setServerMessage(
          data.message ||
            "We couldn't submit your request. Please try again or contact us directly.",
        );
        return;
      }

      trackEvent(ANALYTICS_EVENTS.generateLead, { form_id: id });
      setStatus("success");
      setServerMessage("You're registered for Cornerstone updates.");
      setValues(INITIAL);
      setErrors({});
    } catch {
      setStatus("error");
      setServerMessage("We couldn't submit your request. Please try again or contact us directly.");
    }
  }

  const disabled = status === "submitting";

  return (
    <form
      id={id}
      noValidate
      onSubmit={onSubmit}
      className={`rounded-2xl border border-line bg-paper shadow-[0_1px_0_rgba(30,28,24,0.04)] ${compact ? "p-4 sm:p-5" : "p-5 sm:p-6 lg:p-7"}`}
    >
      <h2 className={`font-serif text-ink ${compact ? "text-xl" : "text-2xl"}`}>{heading}</h2>

      {status === "success" ? (
        <div
          className="mt-5 rounded-xl border border-forest/20 bg-canvas-warm px-4 py-3 text-sm text-forest-deep"
          role="status"
        >
          {serverMessage}
        </div>
      ) : null}

      {status === "error" && serverMessage ? (
        <div
          className="mt-5 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
          role="alert"
        >
          {serverMessage}
        </div>
      ) : null}

      <div className={`${compact ? "mt-4 gap-3" : "mt-5 gap-4"} grid sm:grid-cols-2`}>
        <Field
          id={`${id}-firstName`}
          label="First name"
          required
          autoComplete="given-name"
          value={values.firstName}
          error={errors.firstName}
          onChange={(value) => update("firstName", value)}
          onFocus={markStart}
        />
        <Field
          id={`${id}-lastName`}
          label="Last name"
          required
          autoComplete="family-name"
          value={values.lastName}
          error={errors.lastName}
          onChange={(value) => update("lastName", value)}
          onFocus={markStart}
        />
        <Field
          id={`${id}-email`}
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
          onFocus={markStart}
          className="sm:col-span-2"
        />
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-companyWebsite`}>Company website</label>
        <input
          id={`${id}-companyWebsite`}
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) => update("companyWebsite", event.target.value)}
        />
      </div>

      <div className={compact ? "mt-4" : "mt-5"}>
        <label className="flex items-start gap-3 text-sm leading-6 text-ink">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-forest"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            onFocus={markStart}
            aria-describedby={`${id}-consent-error`}
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            {CONSENT_TEXT}{" "}
            <Link className="underline decoration-line underline-offset-2 hover:text-forest" href="/privacy">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id={`${id}-consent-error`} className="mt-1 text-sm text-error" role="alert">
            {errors.consent}
          </p>
        ) : (
          <p id={`${id}-consent-error`} className="sr-only" />
        )}
      </div>

      <button
        type="submit"
        className={`${compact ? "mt-4" : "mt-5"} inline-flex min-h-12 w-full items-center justify-center rounded-md bg-forest px-5 text-base font-semibold text-paper transition-colors hover:bg-forest-hover disabled:cursor-wait disabled:opacity-80`}
        disabled={disabled}
      >
        {disabled ? "Sending your request…" : CTA.primary}
      </button>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
  hint?: string;
  className?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  onFocus,
  error,
  type = "text",
  required,
  autoComplete,
  inputMode,
  hint,
  className,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-error"> *</span> : null}
        {hint ? <span className="ml-2 font-normal text-ink-muted">{hint}</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        aria-invalid={Boolean(error)}
        aria-describedby={`${hintId} ${errorId}`}
        className="min-h-12 rounded-xl border border-line bg-canvas px-3 text-base text-ink"
      />
      <span id={hintId} className="sr-only">
        {hint || ""}
      </span>
      {error ? (
        <p id={errorId} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : (
        <p id={errorId} className="sr-only" />
      )}
    </div>
  );
}
