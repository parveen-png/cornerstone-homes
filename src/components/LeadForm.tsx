"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import {
  BUYER_TIMELINE_OPTIONS,
  CONSENT_TEXT,
  CONSENT_TEXT_VERSION,
  CTA,
  DISCLOSURE,
  FORM_VERSION,
  HOME_INTEREST_OPTIONS,
  PAGE_VERSION,
} from "@/data/project";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeInterest: string;
  buyerTimeline: string;
  consent: boolean;
  companyWebsite: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  homeInterest: "",
  buyerTimeline: "",
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
      setServerMessage(
        "You're registered for Cornerstone updates. We'll share new project information as it becomes available.",
      );
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
      className={`rounded-2xl border border-line bg-paper p-5 shadow-[0_1px_0_rgba(30,28,24,0.04)] sm:p-6 ${compact ? "" : "lg:p-7"}`}
      aria-describedby={`${id}-disclosure`}
    >
      <h2 className="font-serif text-2xl text-ink">{heading}</h2>
      <p className="mt-2 text-sm text-ink-muted">{CTA.supporting}</p>

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

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          id={`${id}-firstName`}
          label="First Name"
          required
          autoComplete="given-name"
          value={values.firstName}
          error={errors.firstName}
          onChange={(value) => update("firstName", value)}
          onFocus={markStart}
        />
        <Field
          id={`${id}-lastName`}
          label="Last Name"
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
        />
        <Field
          id={`${id}-phone`}
          label="Phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
          onFocus={markStart}
          hint="Optional"
        />
        <SelectField
          id={`${id}-homeInterest`}
          label="Home Interest"
          required
          value={values.homeInterest}
          error={errors.homeInterest}
          onChange={(value) => update("homeInterest", value)}
          onFocus={markStart}
          options={[
            { value: "", label: "Select an option" },
            ...HOME_INTEREST_OPTIONS,
          ]}
        />
        <SelectField
          id={`${id}-buyerTimeline`}
          label="Buyer Timeline"
          value={values.buyerTimeline}
          error={errors.buyerTimeline}
          onChange={(value) => update("buyerTimeline", value)}
          onFocus={markStart}
          options={[...BUYER_TIMELINE_OPTIONS]}
          hint="Optional"
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

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm leading-6 text-ink">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-forest"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            onFocus={markStart}
            aria-describedby={`${id}-consent-note ${id}-consent-error`}
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
        <p id={`${id}-consent-note`} className="mt-2 text-xs text-ink-muted">
          Consent is not pre-checked. Final wording should be reviewed by Ontario legal counsel before launch.
        </p>
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
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-forest px-5 text-base font-semibold text-paper transition-colors hover:bg-forest-hover disabled:cursor-wait disabled:opacity-80"
        disabled={disabled}
      >
        {disabled ? "Sending your request…" : CTA.primary}
      </button>
      <p id={`${id}-disclosure`} className="mt-3 text-xs leading-5 text-ink-muted">
        {DISCLOSURE.short}
      </p>
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
}: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className="flex flex-col gap-1.5">
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

function SelectField({
  id,
  label,
  value,
  onChange,
  onFocus,
  error,
  required,
  options,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  error?: string;
  required?: boolean;
  options: readonly { value: string; label: string }[];
  hint?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-error"> *</span> : null}
        {hint ? <span className="ml-2 font-normal text-ink-muted">{hint}</span> : null}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className="min-h-12 rounded-xl border border-line bg-canvas px-3 text-base text-ink"
      >
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
