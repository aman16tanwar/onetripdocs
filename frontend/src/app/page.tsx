/**
 * OneTripDocs Landing Page
 *
 * 🎓 MENTOR NOTE: Landing Page Best Practices
 * -------------------------------------------
 * A high-converting landing page follows this structure:
 * 1. Hero: Clear value proposition (what you get)
 * 2. Problem: Agitate the pain (why they need it)
 * 3. Solution: Show how you solve it
 * 4. Social Proof: Build trust (testimonials, numbers)
 * 5. CTA: Clear call to action (signup form)
 * 6. FAQ: Address objections
 * 7. Final CTA: One more chance to convert
 */

import { WaitlistForm } from "@/components/waitlist-form";
import { TrapSection } from "@/components/trap-section";
import { SolutionSection } from "@/components/solution-section";
import { SocialProof } from "@/components/social-proof";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center stagger-children">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
                <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Now accepting early access signups
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Don&apos;t Get Trapped at the{" "}
              <span className="text-emerald-600">BLS Counter</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              65% of OCI applicants face a terrible choice: pay $100 NOW or
              rebook in 4 weeks. We validate everything BEFORE you go, so you
              just walk in and submit.
            </p>

            {/* Value Prop */}
            <p className="mt-4 text-2xl font-semibold text-gray-900">
              One Trip. Done.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#waitlist"
                className="w-full rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-500 hover:shadow-xl sm:w-auto"
              >
                Join the Waitlist
              </a>
              <a
                href="#the-trap"
                className="w-full rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 sm:w-auto"
              >
                Learn About the Trap
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span>Free checklist included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span>Launch discount for early signups</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div
            className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-30 sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatItem value="70%" label="First-time rejection rate" />
            <StatItem value="65%" label="Pay extra at BLS counter" />
            <StatItem value="$100" label="Average surprise fee" />
            <StatItem value="4 weeks" label="Rebook wait time" />
          </div>
        </div>
      </section>

      {/* The Trap Section */}
      <TrapSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Social Proof */}
      <SocialProof />

      {/* Waitlist Section */}
      <section id="waitlist" className="bg-emerald-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Be the First to Avoid the Trap
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              Join our early access waitlist. Get launch pricing ($29.99 →
              $19.99) and a free personalized OCI checklist.
            </p>

            <div className="mt-10">
              <WaitlistForm />
            </div>

            <p className="mt-6 text-sm text-emerald-200">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="mt-12 space-y-8">
              <FAQItem
                question="What is the BLS counter trap?"
                answer="When you arrive at BLS with your OCI application, staff often find 'problems' (photocopy quality, form errors) and give you two choices: pay $100 for them to fix it, or go home and rebook (which means 4+ weeks wait, another day off work, another $330+ in total costs). Most people pay the $100 because it's actually cheaper than rebooking."
              />
              <FAQItem
                question="How does OneTripDocs help?"
                answer="We validate EVERYTHING before you go to BLS - photocopy quality, form completion, photo specifications, document organization. You get a 'Counter-Proof Score' (98%+) that means BLS will find zero issues. One trip. No trap. Just submit."
              />
              <FAQItem
                question="How much does it cost?"
                answer="Our premium validation is $29.99 one-time (launch price: $19.99 for early signups). Compare this to: BLS fixing fees ($100), immigration consultants ($500-2000), or rebooking costs ($330+). We save you money AND time."
              />
              <FAQItem
                question="Is this affiliated with the Indian government or BLS?"
                answer="No. OneTripDocs is an independent tool built to help applicants. We use official requirements from government sources but are not affiliated with them. Always verify final requirements with official sources."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to avoid the trap?
          </h2>
          <p className="mt-2 text-gray-600">
            Join hundreds of applicants who refuse to get trapped at the
            counter.
          </p>
          <a
            href="#waitlist"
            className="mt-6 inline-block rounded-full bg-emerald-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-500"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Helper Components
function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-emerald-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-500">{label}</div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-gray-200 pb-8">
      <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
      <p className="mt-2 text-gray-600">{answer}</p>
    </div>
  );
}
