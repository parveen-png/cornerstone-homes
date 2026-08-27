"use client";

import { FormEvent, useState } from "react";

export function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message || "We could not process that request. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(data.message || "Your unsubscribe request has been recorded.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("We could not process that request. Please try again.");
    }
  }

  return (
    <div className="mt-8">
      <form onSubmit={onSubmit} className="max-w-md space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="unsubscribe-email" className="text-sm font-medium text-ink">
            Email address
          </label>
          <input
            id="unsubscribe-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-12 rounded-xl border border-line bg-paper px-3 text-ink"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center rounded-full bg-forest px-5 font-semibold text-paper hover:bg-forest-hover disabled:opacity-80"
        >
          {status === "submitting" ? "Sending your request…" : "Unsubscribe"}
        </button>
      </form>
      {message ? (
        <p className={`mt-4 text-sm ${status === "error" ? "text-error" : "text-forest"}`} role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
