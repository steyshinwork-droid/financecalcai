import type { Metadata } from "next";
import { InvestmentCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";

export const metadata: Metadata = {
  title: "Investment Return Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate your investment returns with different scenarios. Compare stocks, bonds, and other assets with AI-powered insights.",
  keywords:
    "investment calculator, investment return calculator, stock return calculator, ROI calculator",
};

export default function InvestmentPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Investment Return Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate potential returns on your investments. Compare different
          scenarios and get AI-powered analysis.
        </p>
      </div>
      <InvestmentCalc />
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Investment Returns Work
          </h2>
          <p className="text-gray-600">
            Investment returns come from two sources: capital gains (the increase
            in value of your investment) and income (dividends or interest). Over
            long periods, the stock market has historically returned around 7–10%
            per year on average — but returns vary widely year to year. The key
            is staying invested through ups and downs.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The Power of Time in the Market
          </h2>
          <p className="text-gray-600">
            Time is your most powerful investing tool. Thanks to compound growth,
            $10,000 invested at 8% annually becomes $46,610 in 20 years and
            $100,627 in 30 years — without adding another dollar. Starting early
            matters far more than the amount you invest.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Risk vs. Return
          </h2>
          <p className="text-gray-600">
            Higher potential returns typically come with higher risk. Stocks
            offer the best long-term growth but can drop 30–50% in a bad year.
            Bonds are more stable but grow slower. A diversified portfolio
            balances both — helping you grow wealth while protecting against
            major losses.
          </p>
        </div>
      </section>

      <RelatedArticles calculatorHref="/investment-calculator" />
      <RelatedCalculators currentSlug="investment-calculator" />
    </div>
  );
}
