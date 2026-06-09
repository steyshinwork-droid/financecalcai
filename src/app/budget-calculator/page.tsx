import type { Metadata } from "next";
import { BudgetCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Budget Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Plan your monthly budget with AI-powered analysis. Enter your income and expenses, get personalized tips on where to save money.",
  keywords:
    "budget calculator, monthly budget planner, budget planner, expense calculator, 50 30 20 budget",
  alternates: { canonical: "/budget-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Budget Calculator",
  url: "https://www.financecalcai.com/budget-calculator",
  description:
    "Free budget calculator with 50/30/20 rule analysis. Plan your monthly budget with AI-powered tips.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function BudgetPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Budget Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Budget Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Plan your monthly budget using the 50/30/20 rule. Our AI finds where
          you can save money.
        </p>
      </div>
      <BudgetCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The 50/30/20 Budget Rule
          </h2>
          <p className="text-gray-600">
            The 50/30/20 rule is a simple budgeting framework: spend 50% of your
            after-tax income on needs (housing, food, bills), 30% on wants
            (entertainment, dining out), and 20% on savings and debt repayment.
            It&apos;s a great starting point for anyone who wants to take control
            of their finances.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What is the 50/30/20 budget rule?", answer: "The 50/30/20 rule splits your after-tax income: 50% for needs (rent, utilities, groceries, minimum debt payments), 30% for wants (dining out, streaming, hobbies), and 20% for savings and extra debt payoff. It's flexible — if you live in an expensive city, 60% on needs is realistic. Adjust the proportions to fit your situation." },
        { question: "What percentage of income should go to housing?", answer: "The traditional guideline is 28–30% of gross income on housing. But in high-cost cities like NYC or SF, 35–40% is common. More important: keep total debt payments (housing + car + loans) under 36% of gross income. If housing alone exceeds 35%, look for ways to increase income or reduce other expenses." },
        { question: "How do I stick to a budget?", answer: "The most effective strategies: (1) Automate savings on payday — pay yourself first before you can spend it. (2) Use the envelope or zero-based method — assign every dollar a job. (3) Track weekly, not monthly — catching overspending early prevents snowballing. (4) Give yourself a guilt-free spending allowance so the budget doesn't feel like a prison." },
        { question: "What is zero-based budgeting?", answer: "Zero-based budgeting means every dollar of income is assigned a purpose so income minus expenses equals zero. You don't overspend — unspent money is consciously allocated to savings or debt. Apps like YNAB (You Need A Budget) use this method. It's more involved than 50/30/20 but gives complete control over your money." },
        { question: "How much should I have in an emergency fund?", answer: "3–6 months of essential living expenses. If your income is unstable (freelance, seasonal) or you have dependents, aim for 6 months. A single person with a stable job can manage with 3 months. Keep it in a high-yield savings account (4–5% APY) so it earns interest while remaining accessible." },
      ]} />
      <RelatedArticles calculatorHref="/budget-calculator" />
      <RelatedCalculators currentSlug="budget-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the 50/30/20 budget rule?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 50/30/20 rule divides your after-tax income into three categories: 50% for needs (housing, food, utilities), 30% for wants (dining out, entertainment), and 20% for savings and debt repayment. It's a simple framework for managing personal finances.",
                },
              },
              {
                "@type": "Question",
                name: "What percentage of income should go to housing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most financial experts recommend spending no more than 28-30% of your gross monthly income on housing costs including rent or mortgage, insurance, and property taxes.",
                },
              },
              {
                "@type": "Question",
                name: "How do I stick to a budget?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The most effective way to stick to a budget is automation: set up automatic transfers to savings on payday, use autopay for bills, and track spending weekly with an app. Leave yourself a reasonable 'fun money' allowance — overly restrictive budgets fail.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
