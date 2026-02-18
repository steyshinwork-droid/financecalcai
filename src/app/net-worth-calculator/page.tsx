import type { Metadata } from "next";
import { NetWorthCalc } from "./calculator";

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
    </div>
  );
}
