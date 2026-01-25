/**
 * The Trap Section - Explains the BLS counter trap problem
 *
 * 🎓 MENTOR NOTE: Problem Agitation
 * ---------------------------------
 * This section "agitates" the problem - makes the reader feel the pain.
 * The more they feel the problem, the more they want the solution.
 *
 * We use:
 * - Specific scenarios they can relate to
 * - Real numbers (not vague)
 * - Emotional language (trapped, powerless, frustrated)
 */

export function TrapSection() {
  return (
    <section id="the-trap" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The BLS Counter Trap
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Here&apos;s what happens to 65% of OCI applicants
          </p>
        </div>

        {/* The Trap Flow */}
        <div className="mt-16 mx-auto max-w-4xl">
          {/* Timeline */}
          <div className="space-y-8">
            <TrapStep
              number={1}
              title="You arrive at BLS"
              description="You took a day off work. You drove there. You waited in line. 90+ minutes invested."
              icon="🚗"
              status="neutral"
            />

            <TrapStep
              number={2}
              title="Staff reviews your application"
              description="They look through your documents, your forms, your photos..."
              icon="📋"
              status="neutral"
            />

            <TrapStep
              number={3}
              title="They 'find problems'"
              description="'Sir, photocopy quality is not good enough. Also some form errors we noticed.'"
              icon="⚠️"
              status="warning"
            />

            <TrapStep
              number={4}
              title="THE TRAP IS SET"
              description="You're presented with two terrible choices:"
              icon="🪤"
              status="danger"
            />
          </div>

          {/* The Two Choices */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Choice A */}
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
              <div className="text-center">
                <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  Choice A
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Pay $100 NOW
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  They &quot;fix&quot; it and submit today
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  Feels like extortion
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  But at least it&apos;s done
                </li>
              </ul>
              <div className="mt-4 rounded-lg bg-red-100 p-3 text-center">
                <span className="text-lg font-bold text-red-800">Cost: $100</span>
                <p className="text-xs text-red-600 mt-1">+ feeling cheated</p>
              </div>
            </div>

            {/* Choice B */}
            <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-6">
              <div className="text-center">
                <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                  Choice B
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Go Home & Rebook
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  Today&apos;s trip = completely wasted
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  Next appointment: 4+ WEEKS away
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  Another day off work (~$300)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  Another trip to BLS (~$30)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  Hope they don&apos;t find MORE issues
                </li>
              </ul>
              <div className="mt-4 rounded-lg bg-orange-100 p-3 text-center">
                <span className="text-lg font-bold text-orange-800">
                  Cost: $330+
                </span>
                <p className="text-xs text-orange-600 mt-1">
                  + 4 weeks + uncertainty
                </p>
              </div>
            </div>
          </div>

          {/* The Realization */}
          <div className="mt-12 rounded-2xl bg-gray-900 p-8 text-center text-white">
            <p className="text-lg font-medium">
              Most people choose A. Not because it&apos;s fair.
            </p>
            <p className="mt-2 text-2xl font-bold">
              Because B is actually WORSE.
            </p>
            <p className="mt-4 text-gray-400">
              You&apos;re trapped by sunk cost and time pressure. They designed
              it this way.
            </p>
          </div>

          {/* Quote */}
          <div className="mt-12 mx-auto max-w-2xl">
            <blockquote className="border-l-4 border-emerald-500 pl-6 italic text-gray-600">
              &quot;My wife submitted our son&apos;s OCI at BLS Vancouver. They
              said &apos;photocopy quality not good enough, some form
              errors&apos; and charged $100 to fix it. She felt trapped. Still
              talks about how frustrated she felt MONTHS later.&quot;
              <footer className="mt-2 text-sm font-medium text-gray-900">
                — Real user story
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrapStep({
  number,
  title,
  description,
  icon,
  status,
}: {
  number: number;
  title: string;
  description: string;
  icon: string;
  status: "neutral" | "warning" | "danger";
}) {
  const bgColors = {
    neutral: "bg-gray-100",
    warning: "bg-amber-100",
    danger: "bg-red-100",
  };

  const borderColors = {
    neutral: "border-gray-300",
    warning: "border-amber-400",
    danger: "border-red-400",
  };

  return (
    <div className="flex gap-4">
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full ${bgColors[status]} ${borderColors[status]} border-2 flex items-center justify-center text-2xl`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Step {number}
        </p>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
}
