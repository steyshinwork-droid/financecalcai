import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About FinanceCalcAI",
  description:
    "FinanceCalcAI offers free AI-powered financial calculators to help you make smarter money decisions — from mortgages and debt payoff to retirement and investments.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
          About Us
        </p>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
          About FinanceCalcAI
        </h1>
        <p className="text-lg text-gray-500">
          Free financial calculators with AI-powered insights — built to help
          you make better money decisions.
        </p>
      </div>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">What We Do</h2>
          <p>
            FinanceCalcAI provides free, easy-to-use financial calculators
            powered by AI insights. Whether you&apos;re planning to pay off
            debt, save for retirement, calculate your mortgage, or understand
            compound interest — we give you not just numbers, but personalized
            guidance to help you understand what those numbers mean for your
            situation.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Our Calculators
          </h2>
          <ul className="space-y-2">
            {[
              { label: "Compound Interest Calculator", href: "/compound-interest-calculator" },
              { label: "Mortgage Calculator", href: "/mortgage-calculator" },
              { label: "Budget Calculator", href: "/budget-calculator" },
              { label: "Debt Payoff Calculator", href: "/debt-payoff-calculator" },
              { label: "Savings Goal Calculator", href: "/savings-goal-calculator" },
              { label: "Retirement Calculator", href: "/retirement-calculator" },
              { label: "Investment Calculator", href: "/investment-calculator" },
              { label: "Net Worth Calculator", href: "/net-worth-calculator" },
              { label: "Emergency Fund Calculator", href: "/emergency-fund-calculator" },
              { label: "Tax Bracket Calculator", href: "/tax-bracket-calculator" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-emerald-600 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Why FinanceCalcAI?
          </h2>
          <p>
            Most financial calculators just output a number. We go further —
            our AI analyzes your inputs and provides actionable advice tailored
            to your situation. No account required, no paywalls, completely
            free.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Disclaimer</h2>
          <p>
            FinanceCalcAI is for informational and educational purposes only.
            The results and AI-generated insights are not financial advice.
            Always consult a qualified financial advisor before making important
            financial decisions.
          </p>
        </section>
      </div>
    </div>
  );
}
