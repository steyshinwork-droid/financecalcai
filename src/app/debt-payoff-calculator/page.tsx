import type { Metadata } from "next";
import { DebtPayoffCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate the fastest way to pay off your debts. Compare snowball vs avalanche methods with AI-powered recommendations.",
  keywords:
    "debt payoff calculator, debt snowball calculator, debt avalanche calculator, debt free calculator, pay off debt calculator",
};

export default function DebtPayoffPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Debt Payoff Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find the fastest and cheapest way to become debt-free. AI compares
          strategies and shows you the best path.
        </p>
      </div>
      <DebtPayoffCalc />
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Snowball vs Avalanche Method
          </h2>
          <p className="text-gray-600">
            The <strong>Snowball method</strong> pays off the smallest balance
            first for quick wins and motivation. The{" "}
            <strong>Avalanche method</strong> targets the highest interest rate
            first to save the most money. Both work — choose the one that keeps
            you motivated.
          </p>
        </div>
      </section>

      <RelatedArticles calculatorHref="/debt-payoff-calculator" />
      <RelatedCalculators currentSlug="debt-payoff-calculator" />
    </div>
  );
}
