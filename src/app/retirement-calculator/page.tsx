import type { Metadata } from "next";
import { RetirementCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "AI Retirement Calculator — Free | When Can You Retire? | FinanceCalcAI",
  description:
    "Free AI retirement calculator. Find out exactly when you can retire and how much you need saved. Personalized readiness score, 4% rule analysis, and AI-powered advice.",
  keywords:
    "ai retirement calculator, free ai retirement calculator, retirement calculator, retirement planning calculator, when can I retire, how much do I need to retire, 401k calculator",
  alternates: { canonical: "/retirement-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Retirement Calculator",
  url: "https://www.financecalcai.com/retirement-calculator",
  description:
    "Free retirement calculator with 4% rule analysis and personalized retirement readiness score.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RetirementPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Retirement Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          AI Retirement Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find out when you can retire and if you&apos;re saving enough. Our AI
          gives you a personalized retirement readiness score.
        </p>
      </div>
      <RetirementCalc />

      <div className="mt-10">
        <AffiliateBanner variant="investing" />
      </div>
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The 4% Rule
          </h2>
          <p className="text-gray-600">
            The 4% rule suggests you can safely withdraw 4% of your retirement
            savings each year without running out of money. This means you need
            25x your annual expenses saved for retirement. For example, if you
            spend $50,000/year, you need $1,250,000 saved.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "How much do I need to retire?", answer: "Using the 4% rule, you need 25× your annual expenses saved. If you spend $50,000/year, you need $1,250,000. If you spend $80,000/year, you need $2,000,000. Our calculator factors in your current savings, monthly contributions, and expected return to show exactly when you'll hit your number." },
        { question: "How much should I have saved for retirement by age?", answer: "Fidelity's guidelines: by age 30 — 1× your salary; by 40 — 3×; by 50 — 6×; by 60 — 8×; by 67 — 10×. These assume you want to maintain your current lifestyle. If you plan to spend less in retirement, you need less saved." },
        { question: "What is the 4% rule in retirement?", answer: "The 4% rule says you can withdraw 4% of your portfolio in year one, then adjust for inflation each year, with a high probability of your money lasting 30+ years. It's based on historical stock and bond market data going back to 1926. At 3.5% withdrawal rate you have even more safety margin." },
        { question: "When can I start collecting Social Security?", answer: "You can claim Social Security as early as age 62 (reduced benefit) or as late as 70 (maximum benefit). Full retirement age is 66–67 depending on your birth year. Waiting from 62 to 70 increases your benefit by roughly 76%. Our calculator lets you factor in Social Security income." },
        { question: "Is a 401(k) or IRA better for retirement savings?", answer: "Both are valuable and you should use both if possible. A 401(k) has higher contribution limits ($23,000/year in 2024) and often includes employer matching — always get the full match first. A Roth IRA offers tax-free growth and withdrawals. Max your 401(k) match, then fund a Roth IRA, then go back to the 401(k)." },
      ]} />
      <RelatedArticles calculatorHref="/retirement-calculator" />
      <RelatedCalculators currentSlug="retirement-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much do I need to retire?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Using the 4% rule, you need 25 times your annual expenses saved to retire. If you spend $50,000/year, you need $1,250,000. If you spend $80,000/year, you need $2,000,000. This assumes a 30-year retirement with a diversified portfolio.",
                },
              },
              {
                "@type": "Question",
                name: "How much should I have saved for retirement by age?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Common benchmarks: by 30 — 1x your salary; by 40 — 3x your salary; by 50 — 6x your salary; by 60 — 8x your salary; by 67 — 10x your salary. These are Fidelity's guidelines assuming you want to maintain your current lifestyle in retirement.",
                },
              },
              {
                "@type": "Question",
                name: "What is the 4% rule in retirement?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 4% rule states that you can withdraw 4% of your retirement portfolio in year one, then adjust for inflation each year, with a high probability of your money lasting 30 years. It's based on historical stock and bond market returns going back to 1926.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
