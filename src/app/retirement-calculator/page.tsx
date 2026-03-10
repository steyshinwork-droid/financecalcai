import type { Metadata } from "next";
import { RetirementCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";

export const metadata: Metadata = {
  title: "Retirement Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate when you can retire and how much you need. AI-powered analysis with personalized advice on your retirement readiness.",
  keywords:
    "retirement calculator, retirement planning calculator, when can I retire, how much do I need to retire, 401k calculator",
};

export default function RetirementPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Retirement Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find out when you can retire and if you&apos;re saving enough. Our AI
          gives you a personalized retirement readiness score.
        </p>
      </div>
      <RetirementCalc />
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The 4% Rule
          </h2>
          <p className="text-gray-600">
            The 4% rule suggests you can safely withdraw 4% of your retirement
            savings each year without running out of money. This means you need
            25x your annual expenses saved for retirement. For example, if you
            spend $50,000/year, you need $1,250,000 saved.
          </p>
        </div>
      </section>

      <RelatedArticles calculatorHref="/retirement-calculator" />
      <RelatedCalculators currentSlug="retirement-calculator" />
    </div>
  );
}
