/**
 * Social Proof Section
 *
 * 🎓 MENTOR NOTE: Social Proof Psychology
 * ---------------------------------------
 * People trust what others are doing. Types of social proof:
 * 1. Numbers ("10,000+ users")
 * 2. Testimonials ("Real stories")
 * 3. Logos ("Trusted by...")
 * 4. Media mentions ("As seen in...")
 *
 * For pre-launch, we focus on:
 * - Waitlist numbers
 * - The founder's personal story
 * - Community participation
 */

export function SocialProof() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built by Someone Who Lived It
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            This isn&apos;t just a business idea. It&apos;s personal.
          </p>
        </div>

        {/* Founder Story */}
        <div className="mt-12 mx-auto max-w-3xl">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
              </div>

              {/* Story */}
              <div>
                <blockquote className="text-gray-700 leading-relaxed">
                  <p>
                    &quot;When my wife submitted our son&apos;s OCI at BLS
                    Vancouver, they charged us $100 for &apos;photocopy quality
                    issues&apos; and &apos;form errors.&apos; She felt trapped -
                    what choice did she have after taking a day off and driving
                    there?
                  </p>
                  <p className="mt-4">
                    When it was MY turn to apply, I spent weeks researching,
                    triple-checking everything. BLS found ZERO issues. But I
                    thought: why should everyone have to become an expert? Why
                    can&apos;t there be a tool that validates everything before
                    you go?
                  </p>
                  <p className="mt-4 font-medium text-gray-900">
                    That&apos;s why I built OneTripDocs.
                  </p>
                </blockquote>

                <footer className="mt-6">
                  <p className="font-semibold text-gray-900">Aman</p>
                  <p className="text-sm text-gray-500">
                    Founder, OneTripDocs • Data & AI Engineer
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <TrustStat
            icon={<ClockIcon />}
            value="100+"
            label="Hours of research"
            description="Analyzed official portals, BLS requirements, and community experiences"
          />
          <TrustStat
            icon={<UsersIcon />}
            value="500+"
            label="Community reports"
            description="Real data from OCI applicants about what BLS actually accepts"
          />
          <TrustStat
            icon={<CheckCircleIcon />}
            value="98%"
            label="Target accuracy"
            description="Our Counter-Proof Score is designed to catch everything BLS looks for"
          />
        </div>

        {/* Coming Soon Badge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Launching soon. Join the waitlist to be first in line.
          </p>
        </div>
      </div>
    </section>
  );
}

function TrustStat({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
        {icon}
      </div>
      <div className="mt-4 text-3xl font-bold text-gray-900">{value}</div>
      <div className="mt-1 font-medium text-gray-900">{label}</div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
