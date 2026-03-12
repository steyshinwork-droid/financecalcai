import type { Metadata } from "next";
import { SavingsGoalCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Savings Goal Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Set a savings goal and get a personalized plan. AI tells you exactly how much to save each month to reach your target.",
  keywords:
    "savings goal calculator, savings calculator, how much to save, savings planner, emergency fund calculator",
};

export default function SavingsGoalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumb items={[{ label: "Savings Goal Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Savings Goal Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Set your savings target, and our AI creates a personalized plan to get
          you there.
        </p>
      </div>
      <SavingsGoalCalc />
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How to Set a Savings Goal
          </h2>
          <p className="text-gray-600">
            The best savings goals are specific, measurable, and time-bound.
            Instead of &quot;save more money,&quot; try &quot;save $10,000 for an
            emergency fund in 12 months.&quot; Our calculator helps you figure out
            exactly how much you need to save each month.
          </p>
        </div>
      </section>

      <RelatedArticles calculatorHref="/savings-goal-calculator" />
      <RelatedCalculators currentSlug="savings-goal-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much should I save each month?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most financial experts recommend saving at least 20% of your take-home pay. Of that, aim for 15% toward retirement and 5% toward other goals like an emergency fund or house down payment. If 20% isn't possible, start with any amount and increase by 1% every few months.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to save $10,000?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "How long it takes to save $10,000 depends on your monthly savings: at $200/month it takes 50 months, at $400/month it takes 25 months, at $833/month it takes exactly 12 months. A high-yield savings account earning 4-5% APY slightly accelerates the timeline.",
                },
              },
              {
                "@type": "Question",
                name: "Where should I keep my savings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Keep short-term savings in a high-yield savings account (HYSA) earning 4-5% APY — institutions like Ally Bank, Marcus, or SoFi offer these. They're FDIC-insured and accessible within 1-2 business days. Don't keep savings in a regular checking account earning near 0%.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
