import type { Metadata } from "next";
import { MortgageCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Mortgage Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate your monthly mortgage payment with AI-powered affordability analysis. See amortization schedule, total interest, and get personalized advice.",
  keywords:
    "mortgage calculator, home loan calculator, mortgage payment calculator, house affordability calculator",
  alternates: { canonical: "/mortgage-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Mortgage Calculator",
  url: "https://www.financecalcai.com/mortgage-calculator",
  description:
    "Free mortgage calculator with AI-powered affordability analysis. Calculate monthly payments and amortization.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function MortgagePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      <div className="mt-10">
        <AffiliateBanner variant="savings" />
      </div>

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

      <FaqSection items={[
        { question: "How is a monthly mortgage payment calculated?", answer: "Your monthly payment is calculated using the loan amount, interest rate, and loan term. The formula is M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal, r is the monthly interest rate, and n is the number of payments. Our calculator does this automatically." },
        { question: "What is the 28/36 rule for mortgages?", answer: "The 28/36 rule says your monthly housing costs (mortgage, taxes, insurance) should not exceed 28% of your gross monthly income, and total debt payments should not exceed 36%. This is the standard affordability guideline lenders use." },
        { question: "How much do I need for a down payment?", answer: "The standard down payment is 20% to avoid PMI (private mortgage insurance). However, many programs allow as little as 3–5% down. FHA loans require 3.5% with a 580+ credit score. A larger down payment means lower monthly payments and less interest paid overall." },
        { question: "Should I choose a 15-year or 30-year mortgage?", answer: "A 30-year mortgage has lower monthly payments but costs significantly more in total interest. A 15-year mortgage saves tens of thousands in interest but requires higher monthly payments — typically 30–40% more. Choose 15 years if you can comfortably afford it; 30 years if cash flow is a priority." },
        { question: "What credit score do I need to get a mortgage?", answer: "Most conventional loans require a 620+ credit score. FHA loans accept scores as low as 500 (with 10% down) or 580 (with 3.5% down). The higher your score, the better your interest rate — a difference of 0.5% can save you thousands over the life of the loan." },
      ]} />
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
