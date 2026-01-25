/**
 * Solution Section - Shows how OneTripDocs solves the problem
 *
 * 🎓 MENTOR NOTE: Feature to Benefit
 * ----------------------------------
 * Don't just list features. Show benefits:
 * - Feature: "Photocopy validator"
 * - Benefit: "BLS can't charge you $100 for quality issues"
 *
 * The user doesn't care about the feature - they care about the outcome.
 */

export function SolutionSection() {
  return (
    <section id="solution" className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            The Third Option
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Validate at Home. Arrive BLS-Ready.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Instead of choosing between bad (pay $100) and worse (rebook), we
            give you a third option: show up with everything perfect.
          </p>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              step={1}
              title="Answer 5 Questions"
              description="Tell us your situation: former citizen? Married? Where are you applying? Takes 2 minutes."
              icon={<QuestionIcon />}
            />
            <StepCard
              step={2}
              title="Get Your Checklist"
              description="Personalized list of exactly what YOU need. No confusion. No missing documents."
              icon={<ListIcon />}
            />
            <StepCard
              step={3}
              title="Validate Everything"
              description="Upload documents. We check photocopy quality, form errors, photo specs. Get your Counter-Proof Score."
              icon={<ShieldIcon />}
            />
          </div>
        </div>

        {/* The Result */}
        <div className="mt-16 mx-auto max-w-4xl">
          <div className="rounded-2xl bg-emerald-600 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              {/* Left: Counter-Proof Score */}
              <div className="text-center md:text-left">
                <p className="text-emerald-100 text-sm font-medium uppercase tracking-wide">
                  Your Counter-Proof Score
                </p>
                <div className="mt-2 text-6xl font-bold text-white">98%</div>
                <p className="mt-2 text-emerald-100">
                  BLS cannot charge you extra fees
                </p>
              </div>

              {/* Right: What you get */}
              <div className="space-y-3">
                <CheckItem text="Photocopy quality: PASS" />
                <CheckItem text="Form completion: PASS" />
                <CheckItem text="Photo specifications: PASS" />
                <CheckItem text="Document organization: PASS" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<DocumentIcon />}
            title="Photocopy Validator"
            description="AI checks clarity, contrast, brightness. Prevents 'quality not good enough' trap."
          />
          <FeatureCard
            icon={<FormIcon />}
            title="Form Pre-Checker"
            description="Validates against 247 common BLS 'findings'. Zero errors guaranteed."
          />
          <FeatureCard
            icon={<PhotoIcon />}
            title="Photo Analyzer"
            description="Pixel-perfect validation of size, background, face coverage."
          />
          <FeatureCard
            icon={<ChatIcon />}
            title="AI Assistant"
            description="Ask any question about your application. Get instant, cited answers."
          />
        </div>

        {/* Comparison */}
        <div className="mt-16 mx-auto max-w-3xl">
          <h3 className="text-center text-2xl font-bold text-gray-900">
            The Math is Simple
          </h3>

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Scenario
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-600">
                    Risk it → Pay BLS $100
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-red-600">
                    $100
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-600">
                    Risk it → Rebook in 4 weeks
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-red-600">
                    $330+
                  </td>
                </tr>
                <tr className="bg-emerald-50">
                  <td className="px-6 py-4 font-medium text-emerald-900">
                    OneTripDocs → One trip, done
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">
                    $29.99
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Early access price: <span className="line-through">$29.99</span>{" "}
            <span className="font-semibold text-emerald-600">$19.99</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  title,
  description,
  icon,
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
      <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
        {step}
      </div>
      <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-white">
      <svg className="h-5 w-5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span>{text}</span>
    </div>
  );
}

// Icons
function QuestionIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function FormIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
