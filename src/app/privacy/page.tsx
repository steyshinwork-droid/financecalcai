import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for FinanceCalcAI. Learn how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Legal
        </p>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400">Last updated: March 2025</p>
      </div>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Overview</h2>
          <p>
            FinanceCalcAI (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
            is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and safeguard your information when
            you visit{" "}
            <span className="text-emerald-600">financecalcai.vercel.app</span>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Information We Collect
          </h2>
          <p className="mb-3">
            We do not require you to create an account or provide personal
            information to use our calculators. However, we may collect:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Usage data</strong> — pages visited, time spent, and
              interactions, collected anonymously via Google Analytics.
            </li>
            <li>
              <strong>Calculator inputs</strong> — numbers you enter into our
              calculators are processed in your browser and are not stored on
              our servers.
            </li>
            <li>
              <strong>Cookies</strong> — we use cookies for analytics purposes.
              You can disable cookies in your browser settings.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How We Use Your Information
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>To understand how visitors use our site and improve it</li>
            <li>To monitor site performance and fix issues</li>
            <li>To serve relevant content and recommendations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Third-Party Services
          </h2>
          <p className="mb-3">We use the following third-party services:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Google Analytics</strong> — for anonymous usage analytics
            </li>
            <li>
              <strong>Vercel</strong> — for website hosting
            </li>
            <li>
              <strong>Affiliate partners</strong> — we may display links to
              financial products and services. We may earn a commission if you
              click and sign up. This does not affect our content or
              recommendations.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Affiliate Disclosure
          </h2>
          <p>
            Some links on FinanceCalcAI are affiliate links. This means we may
            earn a small commission if you click a link and make a purchase or
            sign up for a service — at no extra cost to you. We only recommend
            products and services we believe are genuinely useful.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Data Security
          </h2>
          <p>
            We take reasonable measures to protect your information. Calculator
            inputs are never transmitted to or stored on our servers — all
            calculations happen locally in your browser.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Children&apos;s Privacy
          </h2>
          <p>
            Our service is not directed to children under 13. We do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will
            be reflected on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Contact</h2>
          <p>
            If you have questions about this Privacy Policy, you can reach us
            through our website.
          </p>
        </section>
      </div>
    </div>
  );
}
