import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Finance<span className="text-emerald-600">Calc</span>AI
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Smart financial calculators powered by AI. Get personalized
              insights, not just numbers.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Calculators</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/compound-interest-calculator" className="hover:text-emerald-600">
                  Compound Interest
                </Link>
              </li>
              <li>
                <Link href="/mortgage-calculator" className="hover:text-emerald-600">
                  Mortgage
                </Link>
              </li>
              <li>
                <Link href="/budget-calculator" className="hover:text-emerald-600">
                  Budget
                </Link>
              </li>
              <li>
                <Link href="/debt-payoff-calculator" className="hover:text-emerald-600">
                  Debt Payoff
                </Link>
              </li>
              <li>
                <Link href="/savings-goal-calculator" className="hover:text-emerald-600">
                  Savings Goal
                </Link>
              </li>
              <li>
                <Link href="/retirement-calculator" className="hover:text-emerald-600">
                  Retirement
                </Link>
              </li>
              <li>
                <Link href="/investment-calculator" className="hover:text-emerald-600">
                  Investment
                </Link>
              </li>
              <li>
                <Link href="/net-worth-calculator" className="hover:text-emerald-600">
                  Net Worth
                </Link>
              </li>
              <li>
                <Link href="/emergency-fund-calculator" className="hover:text-emerald-600">
                  Emergency Fund
                </Link>
              </li>
              <li>
                <Link href="/tax-bracket-calculator" className="hover:text-emerald-600">
                  Tax Bracket
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-900">About</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/about" className="hover:text-emerald-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} FinanceCalcAI. All rights reserved.
          <br />
          <span className="text-xs">
            Calculators are for informational purposes only. Not financial
            advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
