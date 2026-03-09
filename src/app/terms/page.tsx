import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for FinanceCalcAI. Read our terms before using our free financial calculators.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Legal
        </p>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-400">Last updated: March 2025</p>
      </div>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using FinanceCalcAI (&quot;the Site&quot;), you
            accept and agree to be bound by these Terms of Service. If you do
            not agree, please do not use this site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Use of the Site
          </h2>
          <p className="mb-3">You agree to use FinanceCalcAI only for lawful purposes. You must not:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Use the site in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the site</li>
            <li>Use automated tools to scrape or overload the site</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            No Financial Advice
          </h2>
          <p>
            The calculators, AI-generated insights, and all content on
            FinanceCalcAI are provided for{" "}
            <strong>informational and educational purposes only</strong>. Nothing
            on this site constitutes financial, investment, legal, or tax
            advice. Always consult a qualified financial advisor before making
            important financial decisions.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Accuracy of Information
          </h2>
          <p>
            We strive to keep our calculators accurate, but we make no
            guarantees about the accuracy, completeness, or suitability of any
            information provided. Results are estimates and may not reflect
            actual outcomes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Affiliate Links
          </h2>
          <p>
            Some links on this site are affiliate links. We may earn a
            commission if you click and complete a purchase or registration.
            This does not affect the price you pay or our editorial
            independence.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Intellectual Property
          </h2>
          <p>
            All content on FinanceCalcAI — including text, code, design, and
            AI-generated insights — is owned by FinanceCalcAI and protected by
            applicable intellectual property laws. You may not reproduce or
            distribute content without permission.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Limitation of Liability
          </h2>
          <p>
            FinanceCalcAI is provided &quot;as is&quot; without any warranties.
            We are not liable for any losses or damages arising from your use
            of the site or reliance on any information provided.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Changes to Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            site after changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Contact</h2>
          <p>
            If you have questions about these Terms of Service, you can reach
            us through our website.
          </p>
        </section>
      </div>
    </div>
  );
}
