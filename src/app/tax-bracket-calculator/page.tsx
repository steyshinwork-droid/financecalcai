import type { Metadata } from "next";
import { TaxBracketCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Tax Bracket Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate your federal tax bracket and effective tax rate. AI explains how marginal tax brackets work in plain English.",
  keywords:
    "tax bracket calculator, income tax calculator, federal tax calculator, marginal tax rate, effective tax rate",
  alternates: { canonical: "/tax-bracket-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tax Bracket Calculator",
  url: "https://financecalcai.vercel.app/tax-bracket-calculator",
  description:
    "Free tax bracket calculator showing federal tax brackets and effective tax rate with AI explanations.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function TaxBracketPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Tax Bracket Calculator" }]} />
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

      <RelatedArticles calculatorHref="/tax-bracket-calculator" />
      <RelatedCalculators currentSlug="tax-bracket-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do tax brackets work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tax brackets are progressive — you don't pay your top rate on all income. Each bracket only applies to income within that range. For example, if you're single and earn $50,000, you pay 10% on the first $11,600, 12% on income from $11,600-$47,150, and 22% only on income above $47,150.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between marginal and effective tax rate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your marginal tax rate is the rate on your last dollar of income — the bracket you're 'in.' Your effective tax rate is your actual average rate across all income. Someone in the 22% bracket typically has an effective rate of 12-15%, because most of their income was taxed at lower rates.",
                },
              },
              {
                "@type": "Question",
                name: "What are the 2024 federal income tax brackets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 2024 federal tax brackets for single filers are: 10% (up to $11,600), 12% ($11,600-$47,150), 22% ($47,150-$100,525), 24% ($100,525-$191,950), 32% ($191,950-$243,725), 35% ($243,725-$609,350), 37% (over $609,350). These apply to taxable income after deductions.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
