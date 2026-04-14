import type { Metadata } from "next";
import { CreditCardPayoffCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";

export const metadata: Metadata = {
  title: "Credit Card Payoff Calculator - Free | FinanceCalcAI",
  description:
    "See exactly how long it takes to pay off your credit card and how much interest you'll pay. Compare your plan vs. minimum payments and get AI-powered advice.",
  keywords:
    "credit card payoff calculator, credit card debt calculator, pay off credit card, credit card interest calculator",
  alternates: { canonical: "/credit-card-payoff-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Credit Card Payoff Calculator",
  url: "https://financecalcai.vercel.app/credit-card-payoff-calculator",
  description:
    "Free credit card payoff calculator comparing your plan vs minimum payments with AI advice.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function CreditCardPayoffPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Credit Card Payoff Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Credit Card Payoff Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Enter your balance, APR, and monthly payment to see exactly when you&apos;ll
          be debt-free and how much interest you&apos;ll pay. Our AI compares your plan
          to minimum payments so you can see what&apos;s really at stake.
        </p>
      </div>

      <CreditCardPayoffCalc />

      <div className="mt-10">
        <AffiliateBanner variant="debt" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Why Minimum Payments Are a Trap
          </h2>
          <p className="text-gray-600">
            Credit card issuers set minimum payments low on purpose. A typical minimum
            is just 1-2% of your balance — barely covering the interest. On a $5,000
            balance at 22% APR, paying only minimums could take over 25 years and cost
            more in interest than the original debt. The calculator above shows you
            exactly what that difference looks like in your situation.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The Fastest Way to Pay Off Credit Card Debt
          </h2>
          <p className="text-gray-600">
            The most effective strategy is to pick one method (Snowball or Avalanche)
            and stick with it. The Snowball method attacks the smallest balance first for
            psychological wins. The Avalanche method targets the highest APR first to
            minimize total interest. Either beats minimum payments by years and thousands
            of dollars.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Balance Transfers: Cut Your Interest Rate to 0%
          </h2>
          <p className="text-gray-600">
            If your credit score is 670+, you may qualify for a 0% APR balance transfer
            card. These cards offer 0% interest for 12-21 months, meaning every dollar
            you pay goes straight to principal. A $5,000 balance paid at $300/month
            with 0% APR is paid off in 17 months with $0 in interest — compared to
            $1,800+ in interest at 22% APR.
          </p>
        </div>
      </section>

      <RelatedArticles calculatorHref="/credit-card-payoff-calculator" />
      <RelatedCalculators currentSlug="credit-card-payoff-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How long does it take to pay off a credit card?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on your balance, interest rate, and monthly payment. On a $5,000 balance at 22% APR paying $200/month, it takes about 32 months and costs $1,300 in interest. Paying only minimums can take 25+ years.",
                },
              },
              {
                "@type": "Question",
                name: "What is the minimum payment on a credit card?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most credit cards charge a minimum payment of 1-2% of your balance or $25, whichever is greater. This is intentionally low — it maximizes the interest you pay over time.",
                },
              },
              {
                "@type": "Question",
                name: "How can I pay off credit card debt faster?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The three most effective strategies are: (1) Pay more than the minimum — even an extra $50/month makes a big difference. (2) Use the Avalanche method — pay off the highest APR card first. (3) Transfer to a 0% APR balance transfer card if you qualify.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
