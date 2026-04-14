import type { Metadata } from "next";
import { LoanComparisonCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";

export const metadata: Metadata = {
  title: "Loan Comparison Calculator - Compare Two Loans | FinanceCalcAI",
  description:
    "Compare two loans side by side. See monthly payments, total interest, and total cost instantly. AI tells you which loan saves you more money.",
  keywords:
    "loan comparison calculator, compare loans, best loan calculator, loan interest calculator, which loan is better",
  alternates: { canonical: "/loan-comparison-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Loan Comparison Calculator",
  url: "https://financecalcai.vercel.app/loan-comparison-calculator",
  description:
    "Free loan comparison calculator comparing two loans side by side with AI analysis.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function LoanComparisonPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Loan Comparison Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Loan Comparison Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Got two loan offers? Enter both and see the full picture: monthly payment,
          total interest, and total cost. Our AI analyzes the trade-offs and tells you
          which loan actually saves you more money.
        </p>
      </div>

      <LoanComparisonCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            APR vs. Interest Rate: Which Number Matters?
          </h2>
          <p className="text-gray-600">
            Always compare APRs, not interest rates. The APR includes all fees and
            costs associated with the loan, giving you a true cost comparison. A loan
            with a 7% interest rate and 0.5% in origination fees has an APR closer to
            7.5%. Two loans with the same interest rate can have different APRs depending
            on their fees.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Monthly Payment vs. Total Cost: The Trade-Off
          </h2>
          <p className="text-gray-600">
            A longer loan term gives you a lower monthly payment, but you pay more
            interest in total. A 5-year auto loan at 7% costs less overall than a 7-year
            loan at the same rate, even though the monthly payment is higher. Use this
            calculator to see exactly how large that difference is in your situation.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            When to Choose the Loan With Higher Monthly Payments
          </h2>
          <p className="text-gray-600">
            If you can comfortably afford the higher payment, the loan that costs less
            overall is almost always the better choice. The extra monthly cash saved by
            choosing a longer/cheaper loan is rarely invested — it gets spent. Choose
            the shorter, higher-payment loan if total cost is your priority and your
            cash flow supports it.
          </p>
        </div>
      </section>

      <RelatedArticles calculatorHref="/loan-comparison-calculator" />
      <RelatedCalculators currentSlug="loan-comparison-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the difference between APR and interest rate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The interest rate is the basic cost of borrowing. The APR (Annual Percentage Rate) includes the interest rate plus all fees, giving you the true annual cost of the loan. Always compare APRs when evaluating loan offers.",
                },
              },
              {
                "@type": "Question",
                name: "Is a lower monthly payment always better?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Not necessarily. A lower monthly payment usually means a longer term or higher rate, which often results in paying more total interest. Compare both monthly payment and total interest to make the best choice.",
                },
              },
              {
                "@type": "Question",
                name: "How do I compare two loan offers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Compare the APR (not just interest rate), the monthly payment, and the total cost (principal + all interest). Use a loan comparison calculator to see all three side by side instantly.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
