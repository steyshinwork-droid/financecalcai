import type { Metadata } from "next";
import { TaxBracketCalc } from "./calculator";

export const metadata: Metadata = {
  title: "Tax Bracket Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate your federal tax bracket and effective tax rate. AI explains how marginal tax brackets work in plain English.",
  keywords:
    "tax bracket calculator, income tax calculator, federal tax calculator, marginal tax rate, effective tax rate",
};

export default function TaxBracketPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Tax Bracket Calculator
        </h1>
        <p className="text-lg text-gray-600">
          See which tax bracket you&apos;re in and calculate your effective tax
          rate. AI explains how marginal taxes actually work.
        </p>
      </div>
      <TaxBracketCalc />
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Marginal vs. Effective Tax Rate
          </h2>
          <p className="text-gray-600">
            Most people confuse these two. Your <strong>marginal rate</strong> is
            the rate on your last dollar of income — the bracket you&apos;re
            &quot;in.&quot; Your <strong>effective rate</strong> is what you
            actually pay on average across all your income. Being in the 22%
            bracket doesn&apos;t mean you pay 22% on everything — only on the
            portion above the 12% threshold.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            2024 Federal Tax Brackets (Single Filers)
          </h2>
          <p className="text-gray-600">
            The US uses a progressive tax system with seven brackets: 10%, 12%,
            22%, 24%, 32%, 35%, and 37%. Each bracket only applies to income
            within its range. The standard deduction for 2024 is $14,600 for
            single filers, which reduces your taxable income before brackets
            apply.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How to Lower Your Tax Bill
          </h2>
          <p className="text-gray-600">
            Contribute to pre-tax accounts like a 401(k) or Traditional IRA to
            reduce your taxable income. Max out your HSA if you have a
            high-deductible health plan. Itemize deductions if they exceed the
            standard deduction. Understanding your bracket helps you make
            smarter decisions about when to take income or deductions.
          </p>
        </div>
      </section>
    </div>
  );
}
