import type { Metadata } from "next";
import { DebtPayoffCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate the fastest way to pay off your debts. Compare snowball vs avalanche methods with AI-powered recommendations.",
  keywords:
    "debt payoff calculator, debt snowball calculator, debt avalanche calculator, debt free calculator, pay off debt calculator",
  alternates: { canonical: "/debt-payoff-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Debt Payoff Calculator",
  url: "https://www.financecalcai.com/debt-payoff-calculator",
  description:
    "Free debt payoff calculator comparing snowball vs avalanche methods with AI recommendations.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function DebtPayoffPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Debt Payoff Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Debt Payoff Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find the fastest and cheapest way to become debt-free. AI compares
          strategies and shows you the best path.
        </p>
      </div>
      <DebtPayoffCalc />

      <div className="mt-10">
        <AffiliateBanner variant="debt" />
      </div>
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Snowball vs Avalanche Method
          </h2>
          <p className="text-gray-600">
            The <strong>Snowball method</strong> pays off the smallest balance
            first for quick wins and motivation. The{" "}
            <strong>Avalanche method</strong> targets the highest interest rate
            first to save the most money. Both work — choose the one that keeps
            you motivated.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What is the debt snowball method?", answer: "The debt snowball pays off debts from smallest balance to largest, regardless of interest rate. You pay minimums on all debts and throw every extra dollar at the smallest one. When it's gone, you roll that payment to the next. Studies show it has higher completion rates because the quick wins build momentum and motivation." },
        { question: "What is the debt avalanche method?", answer: "The debt avalanche targets the highest interest rate first. You pay minimums on all debts and attack the highest-rate debt with any extra money. This is mathematically optimal — you pay less total interest and get debt-free faster. Best for disciplined people who can stay motivated without quick wins." },
        { question: "Which debt payoff method saves more money?", answer: "The avalanche method saves more in total interest — sometimes hundreds or even thousands of dollars depending on your balances. However, the snowball method has higher real-world completion rates because of the psychological boost from eliminating debts quickly. The best method is the one you'll actually stick to." },
        { question: "Should I pay off debt or invest?", answer: "A practical rule: if your debt interest rate is above 7%, prioritize paying it off — guaranteed return beats uncertain stock returns. If below 4%, invest instead (historically stock returns beat that). Between 4–7%, it's a judgment call. Always get your full 401(k) match first — that's an instant 50–100% return." },
        { question: "How much extra should I pay on debt each month?", answer: "Even small extra payments make a huge difference. An extra $100/month on a $10,000 credit card at 20% APR cuts payoff time from 9+ years to under 3 years and saves thousands in interest. Use our calculator to see exactly how much extra payment changes your payoff date and total interest." },
      ]} />
      <RelatedArticles calculatorHref="/debt-payoff-calculator" />
      <RelatedCalculators currentSlug="debt-payoff-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the debt snowball method?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The debt snowball method pays off debts from smallest balance to largest, regardless of interest rate. You pay minimums on everything and put every extra dollar toward the smallest debt. When it's paid off, you roll that payment to the next one. It provides quick wins that build motivation.",
                },
              },
              {
                "@type": "Question",
                name: "What is the debt avalanche method?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The debt avalanche method targets the highest interest rate debt first. You pay minimums on all debts and direct extra payments to the highest-rate debt. This is mathematically optimal — you pay less total interest and become debt-free faster.",
                },
              },
              {
                "@type": "Question",
                name: "Which debt payoff method saves more money?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The debt avalanche method saves more money in total interest. However, the debt snowball method has higher completion rates because the psychological wins keep people motivated. Choose avalanche if you're disciplined; choose snowball if you've struggled with debt payoff before.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
