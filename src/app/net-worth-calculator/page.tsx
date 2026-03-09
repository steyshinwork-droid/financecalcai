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
    </div>
  );
}
