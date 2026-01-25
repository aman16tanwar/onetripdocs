/**
 * Header Component
 *
 * 🎓 MENTOR NOTE: Sticky Header Pattern
 * -------------------------------------
 * A sticky header:
 * - Stays visible as user scrolls
 * - Provides easy access to navigation
 * - Keeps CTA (Join Waitlist) always visible
 */

"use client"; // Needed for useState in Next.js App Router

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">1</span>
          </div>
          <span className="text-xl font-bold text-gray-900">OneTripDocs</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <a
            href="#the-trap"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            The Trap
          </a>
          <a
            href="#solution"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Solution
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            FAQ
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden rounded-md p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          {mobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 py-4">
            <a
              href="#the-trap"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              The Trap
            </a>
            <a
              href="#solution"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solution
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              className="block mt-4 rounded-full bg-emerald-600 px-5 py-3 text-center text-base font-semibold text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
