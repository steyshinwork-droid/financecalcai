import type { Metadata } from "next";
import { CompoundInterestCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate compound interest with AI-powered insights. See how your money grows over time with personalized advice and beautiful charts. Free, no signup required.",
  keywords:
    "compound interest calculator, compound interest, investment calculator, savings calculator, interest rate calculator",
};

export default function CompoundInterestPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumb items={[{ label: "Compound Interest Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Compound Interest Calculator
        </h1>
        <p className="text-lg text-gray-600">
          See how your money grows with compound interest. Our AI explains the
          results and gives personalized tips.
        </p>
      </div>

      <CompoundInterestCalc />

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What is Compound Interest?
          </h2>
          <p className="text-gray-600">
            Compound interest is interest calculated on both the initial
            principal and the accumulated interest from previous periods. It's
            often called &quot;interest on interest&quot; and is one of the most
            powerful forces in finance. Albert Einstein reportedly called it the
            &quot;eighth wonder of the world.&quot;
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Does Compound Interest Work?
          </h2>
          <p className="text-gray-600">
            When you invest or save money, you earn interest on your initial
            deposit. With compound interest, you then earn interest on both your
            original deposit AND the interest you've already earned. Over time,
            this creates exponential growth — your money starts growing faster
            and faster.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The Compound Interest Formula
          </h2>
          <p className="mb-2 text-gray-600">
            A = P(1 + r/n)^(nt)
          </p>
          <ul className="list-inside list-disc space-y-1 text-gray-600">
            <li><strong>A</strong> = Final amount</li>
            <li><strong>P</strong> = Principal (initial investment)</li>
            <li><strong>r</strong> = Annual interest rate (decimal)</li>
            <li><strong>n</strong> = Number of times interest compounds per year</li>
            <li><strong>t</strong> = Number of years</li>
          </ul>
        </div>
      </section>

      <RelatedArticles calculatorHref="/compound-interest-calculator" />
      <RelatedCalculators currentSlug="compound-interest-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is compound interest?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, it grows exponentially over time — earning 'interest on interest.'",
                },
              },
              {
                "@type": "Question",
                name: "How often does compound interest compound?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Compound interest can compound daily, monthly, quarterly, or annually. The more frequently it compounds, the more you earn. Daily compounding yields slightly more than monthly, which yields more than annual compounding.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Rule of 72?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Rule of 72 is a shortcut to estimate how long it takes to double your money. Divide 72 by your annual interest rate. At 8% interest, your money doubles in 72 ÷ 8 = 9 years.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
