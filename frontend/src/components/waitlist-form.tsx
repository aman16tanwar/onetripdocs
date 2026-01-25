/**
 * Waitlist Form Component
 *
 * 🎓 MENTOR NOTE: Form Best Practices
 * -----------------------------------
 * 1. Minimal fields (just email for MVP)
 * 2. Clear feedback (loading, success, error states)
 * 3. Accessible (labels, aria attributes)
 * 4. Mobile-friendly (large touch targets)
 *
 * This is a "Client Component" because it uses hooks (useState).
 * In Next.js App Router, you must add "use client" directive.
 */

"use client";

import { useState, FormEvent } from "react";

// API base URL - use environment variable in production
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type FormState = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [position, setPosition] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email) return;

    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "landing_page",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle known errors
        if (response.status === 409) {
          setErrorMessage("You're already on the waitlist!");
        } else {
          setErrorMessage(data.detail || "Something went wrong. Please try again.");
        }
        setFormState("error");
        return;
      }

      // Success!
      setPosition(data.position);
      setFormState("success");
    } catch {
      // Network error or API down
      setErrorMessage("Unable to connect. Please try again later.");
      setFormState("error");
    }
  }

  // Success state
  if (formState === "success") {
    return (
      <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur">
        <div className="mx-auto h-16 w-16 rounded-full bg-white flex items-center justify-center">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-white">You&apos;re on the list!</h3>
        {position && (
          <p className="mt-2 text-emerald-100">
            You&apos;re #{position} in line. We&apos;ll email you when we launch.
          </p>
        )}
        <p className="mt-4 text-sm text-emerald-200">
          Check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={formState === "loading"}
          className="flex-1 rounded-full border-0 px-6 py-4 text-gray-900 shadow-lg placeholder:text-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 disabled:opacity-50"
          aria-describedby={errorMessage ? "email-error" : undefined}
        />
        <button
          type="submit"
          disabled={formState === "loading" || !email}
          className="rounded-full bg-gray-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState === "loading" ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner />
              Joining...
            </span>
          ) : (
            "Join Waitlist"
          )}
        </button>
      </div>

      {/* Error message */}
      {formState === "error" && errorMessage && (
        <p
          id="email-error"
          className="mt-3 text-sm text-red-200 text-center"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
