import type { Metadata } from "next";
import { BudgetCalc } from "./calculator";

export const metadata: Metadata = {
  title: "Budget Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Plan your monthly budget with AI-powered analysis. Enter your income and expenses, get personalized tips on where to save money.",
  keywords:
    "budget calculator, monthly budget planner, budget planner, expense calculator, 50 30 20 budget",
};

export default function BudgetPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Budget Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Plan your monthly budget using the 50/30/20 rule. Our AI finds where
          you can save money.
        </p>
      </div>
      <BudgetCalc />
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The 50/30/20 Budget Rule
          </h2>
          <p className="text-gray-600">
            The 50/30/20 rule is a simple budgeting framework: spend 50% of your
            after-tax income on needs (housing, food, bills), 30% on wants
            (entertainment, dining out), and 20% on savings and debt repayment.
            It&apos;s a great starting point for anyone who wants to take control
            of their finances.
          </p>
        </div>
      </section>
    </div>
  );
}
