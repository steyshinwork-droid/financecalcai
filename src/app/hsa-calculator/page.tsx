import type { Metadata } from "next";
import { HsaCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "HSA Calculator - Project Your Health Savings Account Growth | FinanceCalcAI",
  description:
    "Free HSA calculator. See how much your Health Savings Account could grow by retirement, plus the tax savings from contributions and tax-free investment growth.",
  keywords:
    "hsa calculator, health savings account calculator, hsa growth calculator, hsa contribution limits 2025, hsa investment calculator, triple tax advantage calculator",
  alternates: { canonical: "/hsa-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HSA Calculator",
  url: "https://www.financecalcai.com/hsa-calculator",
  description:
    "Calculate how much your Health Savings Account could grow by retirement, including tax-free investment growth and tax savings on contributions.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HsaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "HSA Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          HSA Calculator
        </h1>
        <p className="text-lg text-gray-600">
          See how much your Health Savings Account could be worth by retirement -
          and how much you save in taxes along the way.
        </p>
      </div>
      <HsaCalc />

      <div className="mt-10">
        <AffiliateBanner variant="investing" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What Is an HSA?
          </h2>
          <p className="text-gray-600">
            A Health Savings Account (HSA) is a tax-advantaged account available to
            anyone enrolled in a high-deductible health plan (HDHP). It's often
            called the only account with a "triple tax advantage": contributions
            are tax-deductible (or pre-tax through payroll), the account grows
            tax-free, and withdrawals for qualified medical expenses are never
            taxed. Unlike a Flexible Spending Account, unused HSA funds roll over
            every year and stay with you even if you change jobs.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            HSA Contribution Limits for 2025
          </h2>
          <p className="text-gray-600">
            The IRS caps HSA contributions at $4,300 for individual coverage and
            $8,550 for family coverage in 2025. If you're 55 or older, you can
            contribute an extra $1,000 catch-up contribution. These limits include
            both your own contributions and anything your employer adds on your
            behalf.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Why an HSA Can Double as a Retirement Account
          </h2>
          <p className="text-gray-600">
            Most people spend their HSA balance on medical bills as they go, but
            you don't have to. If you can afford to pay current medical expenses
            out of pocket, letting your HSA balance invest and compound for
            decades turns it into a stealth retirement account. After age 65, you
            can withdraw HSA funds for any purpose - not just medical - and pay
            only ordinary income tax, exactly like a traditional 401(k) or IRA,
            with no early withdrawal penalty.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What are the HSA contribution limits for 2025?", answer: "For 2025, the IRS limit is $4,300 for individual coverage and $8,550 for family coverage. If you're 55 or older, you can add an extra $1,000 catch-up contribution. These limits include both employee and employer contributions combined." },
        { question: "What happens if I contribute too much to my HSA?", answer: "Excess HSA contributions are subject to a 6% excise tax for every year the excess remains in the account. You can avoid this by withdrawing the excess contribution (and any earnings on it) before your tax filing deadline." },
        { question: "Can I use my HSA for anything other than medical expenses?", answer: "Before age 65, non-medical withdrawals are taxed as income plus a 20% penalty. After age 65, you can withdraw for any purpose and pay only ordinary income tax - no penalty - making the HSA function like a traditional IRA at that point." },
        { question: "Should I invest my HSA balance or keep it in cash?", answer: "If you have enough savings elsewhere to cover current medical expenses, investing your HSA balance instead of spending it lets the triple tax advantage compound over decades. Most HSA providers let you invest any balance above a small minimum cash cushion, often $1,000-$2,000." },
        { question: "Does unused HSA money expire at the end of the year?", answer: "No. Unlike a Flexible Spending Account (FSA), HSA funds never expire and roll over indefinitely. The account is also fully portable - it stays with you even if you change employers or health plans." },
      ]} />

      <RelatedArticles calculatorHref="/hsa-calculator" />
      <RelatedCalculators currentSlug="hsa-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What are the HSA contribution limits for 2025?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For 2025, the IRS limit is $4,300 for individual coverage and $8,550 for family coverage, plus a $1,000 catch-up contribution if you're 55 or older.",
                },
              },
              {
                "@type": "Question",
                name: "What happens if I contribute too much to my HSA?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Excess HSA contributions face a 6% excise tax each year they remain in the account, until withdrawn before the tax filing deadline.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use my HSA for anything other than medical expenses?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "After age 65, you can withdraw HSA funds for any purpose and pay only ordinary income tax, with no penalty - just like a traditional IRA.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
