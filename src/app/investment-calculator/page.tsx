import type { Metadata } from "next";
import { InvestmentCalc } from "./calculator";

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
    </div>
  );
}
