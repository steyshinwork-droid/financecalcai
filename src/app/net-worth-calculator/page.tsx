import type { Metadata } from "next";
import { NetWorthCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Net Worth Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate your net worth and track your financial health. AI compares you to benchmarks for your age and gives actionable advice.",
  keywords:
    "net worth calculator, net worth tracker, financial health calculator, assets minus liabilities",
};

export default function NetWorthPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumb items={[{ label: "Net Worth Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Net Worth Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate your net worth and see how you compare to others your age.
          AI gives you a financial health score.
        </p>
      </div>
      <NetWorthCalc />
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What Is Net Worth?
          </h2>
          <p className="text-gray-600">
            Net worth is simply what you own minus what you owe. Assets include
            cash, investments, real estate, and valuables. Liabilities include
            mortgages, car loans, student loans, and credit card debt. A positive
            net worth means you own more than you owe — and growing it over time
            is the foundation of financial health.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Average Net Worth by Age
          </h2>
          <p className="text-gray-600">
            According to the Federal Reserve, the median net worth in the US is
            around $192,700. But medians vary significantly by age: under 35 it&apos;s
            about $39,000, ages 35–44 around $135,000, and ages 55–64 around
            $364,000. Don&apos;t stress about comparisons — focus on your own
            trajectory and whether your number is growing year over year.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How to Grow Your Net Worth
          </h2>
          <p className="text-gray-600">
            Two levers: increase assets and reduce liabilities. Pay down
            high-interest debt aggressively, invest consistently in index funds,
            avoid depreciating assets like new cars, and build income streams.
            Tracking your net worth monthly keeps you accountable and motivated.
          </p>
        </div>
      </section>

      <RelatedArticles calculatorHref="/net-worth-calculator" />
      <RelatedCalculators currentSlug="net-worth-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is net worth?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). Assets include cash, investments, real estate, and vehicles. Liabilities include mortgages, car loans, student loans, and credit card debt.",
                },
              },
              {
                "@type": "Question",
                name: "What is the average net worth by age in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "According to the Federal Reserve (2022): median net worth under 35 is $39,000; ages 35-44 is $135,600; ages 45-54 is $247,200; ages 55-64 is $364,500; ages 65-74 is $409,900. Use median rather than average, as averages are skewed by the ultra-wealthy.",
                },
              },
              {
                "@type": "Question",
                name: "How can I increase my net worth?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To increase net worth: pay down high-interest debt (every dollar of debt eliminated adds directly to net worth), invest consistently in index funds, avoid depreciating assets, increase your income, and track your net worth monthly to stay accountable.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
