import type { Metadata } from "next";
import { LifeInsuranceCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Life Insurance Calculator - How Much Coverage Do You Need? | FinanceCalcAI",
  description:
    "Free life insurance calculator using the DIME method. Find out how much life insurance coverage your family actually needs based on debt, income, mortgage, and education costs.",
  keywords:
    "life insurance calculator, how much life insurance do I need, DIME method life insurance, term life insurance calculator, life insurance needs calculator",
  alternates: { canonical: "/life-insurance-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Life Insurance Calculator",
  url: "https://www.financecalcai.com/life-insurance-calculator",
  description:
    "Calculate how much life insurance coverage your household needs using the DIME method (Debt, Income, Mortgage, Education).",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function LifeInsurancePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Life Insurance Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Life Insurance Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find out how much life insurance coverage your family actually
          needs - based on your debts, income, mortgage, and children's
          future costs, not a generic guess.
        </p>
      </div>
      <LifeInsuranceCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What Is the DIME Method?
          </h2>
          <p className="text-gray-600">
            DIME stands for Debt, Income, Mortgage, and Education - the four
            categories most financial planners use to estimate a household's
            life insurance need. It adds up what your family would owe or
            need to replace (debts, years of lost income, the mortgage
            balance, and future education costs) and subtracts what you
            already have saved or covered. It's more precise than flat rules
            of thumb because it's based on your actual numbers.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Term vs. Whole Life Insurance for This Coverage
          </h2>
          <p className="text-gray-600">
            For pure income replacement, term life insurance is almost always
            the right tool - it's designed to cover a specific period (like
            the years until your mortgage is paid off or your kids are
            through college) at a fraction of the cost of permanent
            insurance. Whole life insurance can make sense for estate
            planning or specific tax situations, but it's rarely the
            efficient choice just to replace lost income.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            When to Recalculate
          </h2>
          <p className="text-gray-600">
            Your coverage need isn't static. Recalculate after having a
            child, paying off (or taking on) a mortgage, a major income
            change, or roughly every 3-5 years as your debts and savings
            shift. Many term policies also let you convert or ladder coverage
            as your needs shrink over time.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "How much life insurance do I actually need?", answer: "It depends on your debts, income, mortgage, and dependents - which is exactly what the DIME method above calculates. As a rough cross-check, many planners suggest 10-15x your annual income, but that ignores your specific mortgage balance and number of children, which can push the real number higher or lower." },
        { question: "Is term or whole life insurance better?", answer: "For income replacement, term life insurance is almost always more cost-effective - you get far more coverage for the same premium. Whole life insurance costs 10-15x more for the same death benefit and is better suited to specific estate planning or tax needs, not general income replacement." },
        { question: "Do I need life insurance if I don't have kids?", answer: "If you have a spouse, shared debts, or a mortgage co-signed with someone else, yes - your death would still create a financial gap for them. If you're single with no dependents and no shared debt, your need is much lower, mainly to cover your own final expenses and any debt that wouldn't simply be forgiven." },
        { question: "How much does term life insurance cost?", answer: "A healthy 35-year-old can often get $500,000 in 20-year level term coverage for $20-30/month. Cost rises with age, health conditions, coverage amount, and term length, so it's worth comparing quotes from multiple insurers rather than buying the first quote you see." },
        { question: "Does employer-provided life insurance replace this need?", answer: "Rarely on its own - most employer policies provide just 1-2x your salary, far below what the DIME method typically calculates. It's also usually not portable if you leave the job. Treat employer coverage as a supplement to, not a replacement for, an individual term policy." },
      ]} />

      <RelatedArticles calculatorHref="/life-insurance-calculator" />
      <RelatedCalculators currentSlug="life-insurance-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much life insurance do I actually need?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on your debts, income, mortgage, and dependents, calculated via the DIME method. A rough cross-check is 10-15x your annual income, though your specific mortgage and number of children can push the real number higher or lower.",
                },
              },
              {
                "@type": "Question",
                name: "Is term or whole life insurance better?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For income replacement, term life insurance is almost always more cost-effective, offering far more coverage for the same premium than whole life insurance.",
                },
              },
              {
                "@type": "Question",
                name: "How much does term life insurance cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A healthy 35-year-old can often get $500,000 in 20-year level term coverage for $20-30 per month, with cost rising based on age, health, coverage amount, and term length.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
