import type { Metadata } from "next";
import { CollegeSavingsCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "College Savings Calculator - 529 Plan Growth & Cost Projector | FinanceCalcAI",
  description:
    "Free 529 plan calculator. See how much your college savings could grow, project future tuition costs, and find out if you're on track to cover them.",
  keywords:
    "college savings calculator, 529 plan calculator, college cost calculator, 529 plan growth calculator, how much to save for college, tuition inflation calculator",
  alternates: { canonical: "/college-savings-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "College Savings Calculator",
  url: "https://www.financecalcai.com/college-savings-calculator",
  description:
    "Calculate how much your 529 plan could grow by the time your child starts college, and whether your current savings rate covers the projected cost.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function CollegeSavingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "College Savings Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          College Savings Calculator
        </h1>
        <p className="text-lg text-gray-600">
          See how much your 529 plan could grow by the time your child starts
          college - and whether you're on track to cover the cost.
        </p>
      </div>
      <CollegeSavingsCalc />

      <div className="mt-10">
        <AffiliateBanner variant="investing" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What Is a 529 Plan?
          </h2>
          <p className="text-gray-600">
            A 529 plan is a tax-advantaged investment account designed
            specifically for education expenses. Contributions grow tax-free,
            and withdrawals are tax-free when used for qualified expenses like
            tuition, room and board, books, and up to $10,000 per year in K-12
            tuition. Many states also offer a tax deduction or credit for
            contributions made to their own plan.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Why College Costs Are Hard to Predict
          </h2>
          <p className="text-gray-600">
            College tuition has historically risen faster than general
            inflation, often 4-6% per year. That means the sticker price when
            your child enrolls could be dramatically higher than today's
            cost - which is why this calculator lets you adjust the cost
            inflation rate separately from your investment return.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What If You're Behind on Savings?
          </h2>
          <p className="text-gray-600">
            A projected shortfall doesn't mean college is out of reach.
            Financial aid, merit scholarships, starting at a community college
            or in-state public school, and federal student loans (Direct
            Loans have favorable terms) can all fill the gap. The goal of this
            calculator is to show you the gap early, while there's still time
            to close it.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What happens to unused 529 funds?", answer: "Unused funds can be used for another beneficiary (a sibling, for example), saved for graduate school, or - since 2024 - up to $35,000 can be rolled into the beneficiary's Roth IRA over their lifetime, subject to annual Roth contribution limits and a 15-year account age requirement. Non-qualified withdrawals are taxed on earnings plus a 10% penalty." },
        { question: "Does a 529 plan hurt financial aid eligibility?", answer: "A parent-owned 529 plan is counted as a parental asset on the FAFSA, which reduces aid eligibility by at most 5.64% of the account value - much less impactful than income or a student-owned asset." },
        { question: "Can I use a 529 plan for K-12 tuition?", answer: "Yes, up to $10,000 per year per student can be withdrawn tax-free for K-12 tuition at public, private, or religious schools, in addition to college expenses." },
        { question: "Do I have to use my own state's 529 plan?", answer: "No, you can invest in almost any state's 529 plan regardless of where you live. However, some states offer a state tax deduction only for contributions to their own plan, so compare that benefit against other plans' fees and investment options." },
        { question: "What's a reasonable rate of return to assume for a 529 plan?", answer: "Most 529 plans offer age-based portfolios that start growth-focused (more stocks) and shift to conservative (more bonds/cash) as college approaches. A long-term average of 5-7% is a reasonable assumption for a portfolio that starts growth-focused years before enrollment." },
      ]} />

      <RelatedArticles calculatorHref="/college-savings-calculator" />
      <RelatedCalculators currentSlug="college-savings-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What happens to unused 529 funds?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Unused funds can go to another beneficiary, be saved for graduate school, or up to $35,000 can be rolled into a Roth IRA for the beneficiary over their lifetime. Non-qualified withdrawals are taxed on earnings plus a 10% penalty.",
                },
              },
              {
                "@type": "Question",
                name: "Does a 529 plan hurt financial aid eligibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A parent-owned 529 plan reduces FAFSA aid eligibility by at most 5.64% of the account value, much less impactful than income.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use a 529 plan for K-12 tuition?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, up to $10,000 per year per student can be withdrawn tax-free for K-12 tuition, in addition to college expenses.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
