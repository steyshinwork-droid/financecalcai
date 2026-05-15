import type { Metadata } from "next";
import { TipCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";

export const metadata: Metadata = {
  title: "Tip Calculator - Split the Bill Fast | FinanceCalcAI",
  description:
    "Calculate tip and split the bill instantly. Choose 10%, 15%, 18%, 20%, or 25% tip, split between any number of people. Free, fast, no ads.",
  keywords:
    "tip calculator, how much to tip, split bill calculator, restaurant tip calculator, tip percentage calculator",
  alternates: { canonical: "/tip-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tip Calculator",
  url: "https://financecalcai.vercel.app/tip-calculator",
  description: "Free tip calculator — choose tip percentage and split between any number of people.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function TipCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Tip Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Tip Calculator</h1>
        <p className="text-lg text-gray-600">
          Enter your bill, choose a tip percentage, and split the total instantly between any number of people.
        </p>
      </div>

      <TipCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How Much Should You Tip?</h2>
          <p className="text-gray-600">
            The standard tip in the US is 15–20% for sit-down restaurants. Here&apos;s a quick guide:
            10% for poor service, 15% for adequate service, 18–20% for good service, and 25%+ for
            exceptional service. For takeout, 10–15% is customary. For delivery, 15–20% or $3–5
            minimum depending on distance. For bartenders, $1–2 per drink or 15–20% of the tab.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How to Calculate a Tip Manually</h2>
          <p className="text-gray-600">
            To calculate a 20% tip: move the decimal point one place left (10% of $85 = $8.50),
            then double it ($8.50 × 2 = $17). For 15%: find 10% and add half of that.
            For 18%: find 10% + 5% + 3%. Our calculator does this instantly for any percentage.
          </p>
        </div>
      </section>

      <RelatedArticles calculatorHref="/tip-calculator" />
      <RelatedCalculators currentSlug="tip-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much should I tip at a restaurant?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The standard restaurant tip in the US is 15–20%. Tip 15% for adequate service, 18–20% for good service, and 25% or more for exceptional service. For poor service, 10% is acceptable.",
                },
              },
              {
                "@type": "Question",
                name: "Should I tip on the pre-tax or post-tax amount?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most etiquette experts say tip on the pre-tax amount, but the difference is small. On a $100 bill with 8% tax, tipping 20% on pre-tax = $20, on post-tax = $21.60. Either is acceptable.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
