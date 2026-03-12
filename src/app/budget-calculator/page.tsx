import type { Metadata } from "next";
import { BudgetCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Budget Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Plan your monthly budget with AI-powered analysis. Enter your income and expenses, get personalized tips on where to save money.",
  keywords:
    "budget calculator, monthly budget planner, budget planner, expense calculator, 50 30 20 budget",
};

export default function BudgetPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
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
