import type { Metadata } from "next";
import { MortgageCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";

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
      <Breadcrumb items={[{ label: "Mortgage Calculator" }]} />
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

      <RelatedArticles calculatorHref="/mortgage-calculator" />
      <RelatedCalculators currentSlug="mortgage-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How is a monthly mortgage payment calculated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A monthly mortgage payment is calculated using the loan amount, interest rate, and loan term. The formula is: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal, r is the monthly interest rate, and n is the number of payments.",
                },
              },
              {
                "@type": "Question",
                name: "What is the 28/36 rule for mortgages?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 28/36 rule says your monthly housing costs should not exceed 28% of your gross monthly income, and total debt payments should not exceed 36%. This is a widely used guideline for determining mortgage affordability.",
                },
              },
              {
                "@type": "Question",
                name: "How much do I need for a down payment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The standard down payment is 20% to avoid private mortgage insurance (PMI). However, many loan programs allow as little as 3-5% down. FHA loans require 3.5% down with a 580+ credit score.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
