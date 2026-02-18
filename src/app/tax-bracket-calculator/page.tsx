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
    </div>
  );
}
