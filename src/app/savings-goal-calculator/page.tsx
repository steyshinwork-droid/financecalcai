import type { Metadata } from "next";
import { SavingsGoalCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";

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
    </div>
  );
}
