import type { Metadata } from "next";
import { MortgageCalc } from "./calculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate your monthly mortgage payment with AI-powered affordability analysis. See amortization schedule, total interest, and get personalized advice.",
  keywords:
    "mortgage calculator, home loan calculator, mortgage payment calculator, house affordability calculator",
};

export default function MortgagePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Mortgage Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate your monthly payment and see if you can afford the home. Our
          AI analyzes your situation and gives honest advice.
        </p>
      </div>

      <MortgageCalc />

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Does a Mortgage Work?
          </h2>
          <p className="text-gray-600">
            A mortgage is a loan used to buy a home. You borrow money from a
            lender and pay it back over time (usually 15 or 30 years) with
            interest. Each monthly payment includes both principal (the amount
            you borrowed) and interest (the cost of borrowing).
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The 28/36 Rule
          </h2>
          <p className="text-gray-600">
            Financial experts recommend spending no more than 28% of your gross
            monthly income on housing costs, and no more than 36% on total debt
            payments. Our AI uses this rule to evaluate your mortgage
            affordability.
          </p>
        </div>
      </section>
    </div>
  );
}
