"use client";

import Link from "next/link";
import { Calculator, Menu, X } from "lucide-react";
import { useState } from "react";

const calculators = [
  { name: "Compound Interest", href: "/compound-interest-calculator" },
  { name: "Mortgage", href: "/mortgage-calculator" },
  { name: "Budget", href: "/budget-calculator" },
  { name: "Debt Payoff", href: "/debt-payoff-calculator" },
  { name: "Savings Goal", href: "/savings-goal-calculator" },
  { name: "Retirement", href: "/retirement-calculator" },
  { name: "Investment", href: "/investment-calculator" },
  { name: "Net Worth", href: "/net-worth-calculator" },
  { name: "Emergency Fund", href: "/emergency-fund-calculator" },
  { name: "Tax Bracket", href: "/tax-bracket-calculator" },
  { name: "Credit Card Payoff", href: "/credit-card-payoff-calculator" },
  { name: "Loan Comparison", href: "/loan-comparison-calculator" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Finance<span className="text-emerald-600">Calc</span>AI
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {calculators.slice(0, 3).map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="text-sm text-gray-600 transition hover:text-emerald-600"
            >
              {calc.name}
            </Link>
          ))}
          <Link
            href="/#calculators"
            className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
          >
            All Calculators
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
          >
            Blog
          </Link>
          <Link
            href="/glossary"
            className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
          >
            Glossary
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t bg-white px-4 py-4 md:hidden">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="block py-2 text-gray-600 transition hover:text-emerald-600"
              onClick={() => setMenuOpen(false)}
            >
              {calc.name}
            </Link>
          ))}
          <Link
            href="/blog"
            className="block py-2 font-medium text-gray-600 transition hover:text-emerald-600"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/glossary"
            className="block py-2 font-medium text-emerald-600 transition hover:text-emerald-700"
            onClick={() => setMenuOpen(false)}
          >
            Glossary
          </Link>
        </nav>
      )}
    </header>
  );
}
