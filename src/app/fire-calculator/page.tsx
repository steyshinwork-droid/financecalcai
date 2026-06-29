import type { Metadata } from "next";
import { FireCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "FIRE Calculator вЂ” When Can You Retire Early? | FinanceCalcAI",
  description:
    "Free FIRE calculator. Find your FIRE number, see when you can retire early, and track your progress toward financial independence. Supports Lean FIRE, Regular FIRE, and Fat FIRE.",
  keywords:
    "fire calculator, fire number calculator, financial independence calculator, early retirement calculator, lean fire calculator, fat fire calculator, how much to retire early, when can i retire early",
  alternates: { canonical: "/fire-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FIRE Calculator",
  url: "https://www.financecalcai.com/fire-calculator",
  description:
    "Calculate your FIRE number and find out when you can achieve financial independence and retire early.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function FirePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "FIRE Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          FIRE Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find your FIRE number вЂ” the portfolio size you need to retire early.
          See exactly how many years until you reach financial independence.
        </p>
      </div>
      <FireCalc />

      <div className="mt-10">
        <AffiliateBanner variant="retirement" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What Is FIRE?
          </h2>
          <p className="text-gray-600">
            FIRE stands for Financial Independence, Retire Early. It&apos;s a
            movement built around saving and investing aggressively вЂ” typically
            50вЂ“70% of income вЂ” so you can leave traditional employment decades
            before the conventional retirement age of 65. The core idea: once
            your investment portfolio generates enough passive income to cover
            your expenses indefinitely, you&apos;re financially independent.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Is the FIRE Number Calculated?
          </h2>
          <p className="text-gray-600">
            Your FIRE number is your annual expenses divided by your safe
            withdrawal rate. At the standard 4% rate, the formula is: Annual
            Expenses Г— 25 = FIRE Number. So if you plan to spend $40,000/year
            in retirement, you need $1,000,000 invested. At $60,000/year, you
            need $1,500,000. The 4% rule comes from the Trinity Study, which
            found that a 4% annual withdrawal from a balanced portfolio had a
            high probability of lasting 30 years historically.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Lean FIRE vs. Regular FIRE vs. Fat FIRE
          </h2>
          <p className="text-gray-600">
            Lean FIRE targets annual spending under $40,000 and requires a
            portfolio of $1,000,000 or less. Regular FIRE targets $50,000вЂ“
            $80,000/year spending with a $1.25MвЂ“$2M portfolio. Fat FIRE targets
            $100,000+ per year and requires $2.5M+. Your target depends on your
            lifestyle and what &quot;enough&quot; means to you.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What is the FIRE number?", answer: "Your FIRE number is the total portfolio size you need to retire and live off investment returns indefinitely. It's calculated as: Annual Expenses Г· Safe Withdrawal Rate. At the standard 4% withdrawal rate, this is Annual Expenses Г— 25. If you plan to spend $50,000/year, your FIRE number is $1,250,000." },
        { question: "Is the 4% rule still valid?", answer: "The 4% rule was based on 30-year retirement horizons. For early retirees facing 40вЂ“50 year retirements, many financial planners recommend 3.5% or even 3.3% to account for longer time horizons and lower future expected returns. At 3.5%, your FIRE number becomes Annual Expenses Г— 28.6. The extra safety margin is meaningful over long retirements." },
        { question: "How much should I save each month for FIRE?", answer: "Your savings rate is the most important factor. People who reach FIRE early typically save 40вЂ“70% of their income. At a 50% savings rate (earning $80,000, saving $40,000/year), most people reach FIRE within 15вЂ“17 years starting from zero. Our calculator shows exactly how your monthly contribution affects your FIRE timeline." },
        { question: "What is Lean FIRE vs. Fat FIRE?", answer: "Lean FIRE is early retirement on a frugal budget вЂ” typically under $40,000/year, requiring under $1,000,000 invested. Fat FIRE is retiring with $100,000+/year in spending, requiring $2,500,000 or more. Most people target somewhere in between, called Regular FIRE ($50,000вЂ“$80,000/year). Your target depends entirely on your lifestyle and what you want from retirement." },
        { question: "What investments should I use to reach FIRE?", answer: "Most FIRE pursuers invest primarily in low-cost index funds вЂ” total market funds or S&P 500 funds with expense ratios under 0.10%. Tax-advantaged accounts first: max your 401(k) match, fund a Roth IRA, then return to the 401(k). After that, a taxable brokerage account. Tax-efficiency matters: hold index funds in taxable accounts, bonds in tax-advantaged accounts. The target allocation is typically 80вЂ“100% stocks during accumulation." },
      ]} />

      <RelatedArticles calculatorHref="/fire-calculator" />
      <RelatedCalculators currentSlug="fire-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the FIRE number?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your FIRE number is your annual expenses divided by your safe withdrawal rate. At 4%, this equals Annual Expenses Г— 25. If you spend $50,000/year, your FIRE number is $1,250,000.",
                },
              },
              {
                "@type": "Question",
                name: "Is the 4% rule still valid?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 4% rule was designed for 30-year retirements. For early retirees with 40вЂ“50 year horizons, many experts recommend 3.5% for extra safety margin.",
                },
              },
              {
                "@type": "Question",
                name: "What is Lean FIRE vs. Fat FIRE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lean FIRE is early retirement on under $40,000/year (under $1M portfolio). Fat FIRE is $100,000+/year ($2.5M+ portfolio). Most people target Regular FIRE in between.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

