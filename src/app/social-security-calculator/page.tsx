import type { Metadata } from "next";
import { SocialSecurityCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Social Security Calculator вЂ” Estimate Your Benefits | FinanceCalcAI",
  description:
    "Free Social Security benefits calculator. Estimate your monthly benefit at age 62, 67, or 70. See breakeven analysis and the best age to claim based on your income and work history.",
  keywords:
    "social security calculator, social security benefits calculator, when to claim social security, social security retirement benefits, ssa benefits estimator, social security breakeven calculator",
  alternates: { canonical: "/social-security-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Social Security Benefits Calculator",
  url: "https://www.financecalcai.com/social-security-calculator",
  description:
    "Estimate your Social Security retirement benefits and find the optimal claiming age with AI insights.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function SocialSecurityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Social Security Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Social Security Benefits Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Estimate your monthly Social Security retirement benefit and find the
          best age to claim based on your income, work history, and life
          expectancy.
        </p>
      </div>
      <SocialSecurityCalc />

      <div className="mt-10">
        <AffiliateBanner variant="retirement" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Social Security Benefits Are Calculated
          </h2>
          <p className="text-gray-600">
            The SSA calculates your benefit using your 35 highest-earning years,
            adjusted for inflation. These earnings are averaged into your AIME
            (Average Indexed Monthly Earnings). The SSA then applies a
            progressive formula using "bend points" вЂ” in 2025, you receive 90%
            of the first $1,226 of AIME, 32% of AIME between $1,226 and $7,391,
            and 15% of anything above $7,391. The result is your PIA (Primary
            Insurance Amount) вЂ” your benefit at Full Retirement Age (67).
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            When Should You Claim Social Security?
          </h2>
          <p className="text-gray-600">
            The decision hinges on three factors: health and life expectancy,
            other income sources, and marital status. Claiming at 62 locks in a
            permanent ~30% reduction vs. waiting until 67. Delaying to 70
            increases benefits by 8% per year beyond Full Retirement Age.
            There's no universally right answer вЂ” early claiming is rational if
            you have health concerns or need the income; delaying is better for
            those in good health who can bridge the gap with savings or a
            spouse's income.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Spousal and Survivor Benefits
          </h2>
          <p className="text-gray-600">
            Married couples have additional strategy options. A spouse who
            earned less (or didn't work) can claim up to 50% of the higher
            earner's PIA. When a spouse dies, the survivor can claim 100% of
            the deceased's benefit if it's larger. This makes delaying the
            higher earner's benefit especially valuable вЂ” it effectively
            provides a larger survivor benefit for life.
          </p>
        </div>
      </section>

      <FaqSection
        items={[
          {
            question: "What is Full Retirement Age (FRA) for Social Security?",
            answer:
              "Full Retirement Age is 67 for anyone born in 1960 or later. For those born between 1943вЂ“1954, FRA was 66. For 1955вЂ“1959, it gradually increased from 66 to 67. At FRA, you receive 100% of your PIA (Primary Insurance Amount) with no reduction.",
          },
          {
            question: "What happens if I claim Social Security at 62?",
            answer:
              "Claiming at 62 (the earliest possible age) permanently reduces your benefit by about 30% compared to waiting until 67. The reduction is 5/9 of 1% per month for the first 36 months early, and 5/12 of 1% for each additional month. This reduction is permanent вЂ” it doesn't go away when you reach FRA.",
          },
          {
            question: "Is it worth waiting until 70 to claim Social Security?",
            answer:
              "Delaying past Full Retirement Age increases your benefit by 8% per year (0.67% per month) until age 70. This means waiting from 67 to 70 boosts your benefit by 24%. The breakeven point vs. claiming at 67 is typically around age 82вЂ“83. If you expect to live into your mid-80s or beyond, delaying to 70 almost always pays off вЂ” especially for the higher earner in a couple due to survivor benefit implications.",
          },
          {
            question: "How does working affect my Social Security benefits?",
            answer:
              "If you claim Social Security before Full Retirement Age and still work, your benefits may be temporarily reduced if your earnings exceed the annual limit ($22,320 in 2025). Once you reach FRA, there's no earnings limit. Also, Social Security uses your 35 highest-earning years вЂ” continuing to work and replacing low-income years can increase your benefit even after you start collecting.",
          },
          {
            question: "Are Social Security benefits taxable?",
            answer:
              "Up to 85% of Social Security benefits can be subject to federal income tax, depending on your 'combined income' (AGI + nontaxable interest + half of SS benefits). If combined income is below $25,000 (single) or $32,000 (married), benefits are not taxed. Between $25,000вЂ“$34,000 (single), up to 50% is taxable. Above $34,000 (single), up to 85% is taxable. Some states also tax Social Security benefits.",
          },
        ]}
      />

      <RelatedArticles calculatorHref="/social-security-calculator" />
      <RelatedCalculators currentSlug="social-security-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Full Retirement Age for Social Security?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Full Retirement Age is 67 for anyone born in 1960 or later. At FRA, you receive 100% of your Primary Insurance Amount with no reduction.",
                },
              },
              {
                "@type": "Question",
                name: "What happens if I claim Social Security at 62?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Claiming at 62 permanently reduces your benefit by about 30% compared to waiting until 67. This reduction never goes away.",
                },
              },
              {
                "@type": "Question",
                name: "Is it worth waiting until 70 to claim Social Security?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Delaying to 70 increases your benefit by 24% vs. claiming at 67. The breakeven point is around age 82вЂ“83. It pays off for those in good health or who want to maximize a spouse's survivor benefit.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

