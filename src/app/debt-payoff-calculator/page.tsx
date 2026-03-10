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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the debt snowball method?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The debt snowball method pays off debts from smallest balance to largest, regardless of interest rate. You pay minimums on everything and put every extra dollar toward the smallest debt. When it's paid off, you roll that payment to the next one. It provides quick wins that build motivation.",
                },
              },
              {
                "@type": "Question",
                name: "What is the debt avalanche method?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The debt avalanche method targets the highest interest rate debt first. You pay minimums on all debts and direct extra payments to the highest-rate debt. This is mathematically optimal — you pay less total interest and become debt-free faster.",
                },
              },
              {
                "@type": "Question",
                name: "Which debt payoff method saves more money?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The debt avalanche method saves more money in total interest. However, the debt snowball method has higher completion rates because the psychological wins keep people motivated. Choose avalanche if you're disciplined; choose snowball if you've struggled with debt payoff before.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
