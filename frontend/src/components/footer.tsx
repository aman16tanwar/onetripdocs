/**
 * Footer Component
 *
 * 🎓 MENTOR NOTE: Footer Best Practices
 * -------------------------------------
 * A good footer includes:
 * - Brand/logo
 * - Important links (legal, social)
 * - Copyright
 * - Contact info
 *
 * Keep it simple for MVP - you can expand later.
 */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <span className="text-xl font-bold text-white">OneTripDocs</span>
            </div>
            <p className="mt-4 text-sm">
              One Trip. Done. OCI application validation platform.
            </p>
            <p className="mt-2 text-sm">
              Built with frustration, powered by determination.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#the-trap" className="hover:text-white transition-colors">
                  The BLS Trap
                </a>
              </li>
              <li>
                <a href="#solution" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#waitlist" className="hover:text-white transition-colors">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="font-semibold text-white">Contact</h3>
              <p className="mt-2 text-sm">
                <a
                  href="mailto:hello@onetripdocs.com"
                  className="hover:text-white transition-colors"
                >
                  hello@onetripdocs.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm">
              © {currentYear} OneTripDocs. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Not affiliated with the Indian Government, BLS International, or
              any consulate. This is an independent tool.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
