import type { Metadata } from "next";
import { SavingsGoalCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Savings Goal Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Set a savings goal and get a personalized plan. AI tells you exactly how much to save each month to reach your target.",
  keywords:
    "savings goal calculator, savings calculator, how much to save, savings planner, emergency fund calculator",
  alternates: { canonical: "/savings-goal-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Savings Goal Calculator",
  url: "https://www.financecalcai.com/savings-goal-calculator",
  description:
    "Free savings goal calculator with personalized monthly savings plan and AI tips.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function SavingsGoalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Savings Goal Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Savings Goal Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Set your savings target, and our AI creates a personalized plan to get
          you there.
        </p>
      </div>
      <SavingsGoalCalc />

      <div className="mt-10">
        <AffiliateBanner variant="savings" />
      </div>
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How to Set a Savings Goal
          </h2>
          <p className="text-gray-600">
            The best savings goals are specific, measurable, and time-bound.
            Instead of &quot;save more money,&quot; try &quot;save $10,000 for an
            emergency fund in 12 months.&quot; Our calculator helps you figure out
            exactly how much you need to save each month.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "How much should I save each month?", answer: "Aim for at least 20% of take-home pay: 15% toward retirement and 5% toward other goals. If that's not feasible, start with any amount — even $50/month — and increase by 1–2% every few months. The habit of saving consistently matters more than the initial amount. Use our calculator to find your exact monthly target." },
        { question: "How long does it take to save $10,000?", answer: "At $200/month: ~50 months. At $400/month: ~25 months. At $833/month: exactly 12 months. In a high-yield savings account at 4.5% APY, you'd reach $10,000 about 1–2 months sooner due to interest. The key is automating the transfer so you never 'forget' to save." },
        { question: "Where should I keep my savings?", answer: "For goals under 2 years, use a high-yield savings account (HYSA) earning 4–5% APY — Ally, Marcus by Goldman Sachs, and SoFi consistently offer competitive rates. For goals 2–5 years out, consider a CD ladder. Keep it accessible (within 1–2 business days) but separate from your checking account so you're not tempted to spend it." },
        { question: "Should I save or pay off debt first?", answer: "Do both simultaneously: maintain a small emergency fund ($1,000) while aggressively paying high-interest debt. Once high-interest debt (above 7%) is gone, redirect those payments to savings. Always contribute enough to get the full employer 401(k) match before anything else — it's an instant 50–100% return." },
        { question: "How much of an emergency fund do I need?", answer: "3–6 months of essential living expenses (rent, food, utilities, minimum debt payments). If your income is variable (freelance, sales, seasonal work), aim for 6 months. Two-income households can often get by with 3 months. Single-income households with dependents should target 6–9 months for real security." },
      ]} />
      <RelatedArticles calculatorHref="/savings-goal-calculator" />
      <RelatedCalculators currentSlug="savings-goal-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much should I save each month?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most financial experts recommend saving at least 20% of your take-home pay. Of that, aim for 15% toward retirement and 5% toward other goals like an emergency fund or house down payment. If 20% isn't possible, start with any amount and increase by 1% every few months.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to save $10,000?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "How long it takes to save $10,000 depends on your monthly savings: at $200/month it takes 50 months, at $400/month it takes 25 months, at $833/month it takes exactly 12 months. A high-yield savings account earning 4-5% APY slightly accelerates the timeline.",
                },
              },
              {
                "@type": "Question",
                name: "Where should I keep my savings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Keep short-term savings in a high-yield savings account (HYSA) earning 4-5% APY — institutions like Ally Bank, Marcus, or SoFi offer these. They're FDIC-insured and accessible within 1-2 business days. Don't keep savings in a regular checking account earning near 0%.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
