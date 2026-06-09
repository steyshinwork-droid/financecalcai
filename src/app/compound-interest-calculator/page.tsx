import type { Metadata } from "next";
import { CompoundInterestCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate compound interest with AI-powered insights. See how your money grows over time with personalized advice and beautiful charts. Free, no signup required.",
  keywords:
    "compound interest calculator, compound interest, investment calculator, savings calculator, interest rate calculator",
  alternates: { canonical: "/compound-interest-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Compound Interest Calculator",
  url: "https://www.financecalcai.com/compound-interest-calculator",
  description:
    "Free compound interest calculator with AI-powered insights. Calculate how your money grows over time.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function CompoundInterestPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Compound Interest Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Compound Interest Calculator
        </h1>
        <p className="text-lg text-gray-600">
          See how your money grows with compound interest. Our AI explains the
          results and gives personalized tips.
        </p>
      </div>

      <CompoundInterestCalc />

      <div className="mt-10">
        <AffiliateBanner variant="investing" />
      </div>

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What is Compound Interest?
          </h2>
          <p className="text-gray-600">
            Compound interest is interest calculated on both the initial
            principal and the accumulated interest from previous periods. It's
            often called &quot;interest on interest&quot; and is one of the most
            powerful forces in finance. Albert Einstein reportedly called it the
            &quot;eighth wonder of the world.&quot;
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Does Compound Interest Work?
          </h2>
          <p className="text-gray-600">
            When you invest or save money, you earn interest on your initial
            deposit. With compound interest, you then earn interest on both your
            original deposit AND the interest you've already earned. Over time,
            this creates exponential growth — your money starts growing faster
            and faster.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The Compound Interest Formula
          </h2>
          <p className="mb-2 text-gray-600">
            A = P(1 + r/n)^(nt)
          </p>
          <ul className="list-inside list-disc space-y-1 text-gray-600">
            <li><strong>A</strong> = Final amount</li>
            <li><strong>P</strong> = Principal (initial investment)</li>
            <li><strong>r</strong> = Annual interest rate (decimal)</li>
            <li><strong>n</strong> = Number of times interest compounds per year</li>
            <li><strong>t</strong> = Number of years</li>
          </ul>
        </div>
      </section>

      <FaqSection items={[
        { question: "What is compound interest?", answer: "Compound interest is interest calculated on both your initial principal AND the accumulated interest from previous periods — 'interest on interest.' Unlike simple interest, it grows exponentially. $10,000 at 8% simple interest grows to $18,000 after 10 years; with compound interest it grows to $21,589." },
        { question: "How often does compound interest compound?", answer: "It can compound daily, monthly, quarterly, or annually. The more frequently it compounds, the more you earn. Daily compounding yields slightly more than monthly, which yields more than annual. High-yield savings accounts typically compound daily. Most investment returns are compounded annually in projections." },
        { question: "What is the Rule of 72?", answer: "The Rule of 72 is a quick shortcut: divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 8% interest: 72 ÷ 8 = 9 years to double. At 6%: 12 years. At 12%: 6 years. It's a mental math trick that works remarkably well." },
        { question: "What is a good compound interest rate?", answer: "For savings accounts: 4–5% APY is considered good in a high-rate environment. For investments: the S&P 500 has historically returned about 10% annually (7% after inflation). For bonds: 3–5%. CDs: 4–5%. Anything promising 15%+ consistently is very likely a scam or extremely high risk." },
        { question: "How do I maximize compound interest?", answer: "Three factors matter most: (1) Start early — time is the biggest multiplier. Starting at 25 vs 35 can double your final amount. (2) Reinvest everything — don't withdraw interest or dividends. (3) Increase contribution frequency — monthly contributions outperform annual lump sums because money starts compounding sooner." },
      ]} />
      <RelatedArticles calculatorHref="/compound-interest-calculator" />
      <RelatedCalculators currentSlug="compound-interest-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is compound interest?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, it grows exponentially over time — earning 'interest on interest.'",
                },
              },
              {
                "@type": "Question",
                name: "How often does compound interest compound?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Compound interest can compound daily, monthly, quarterly, or annually. The more frequently it compounds, the more you earn. Daily compounding yields slightly more than monthly, which yields more than annual compounding.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Rule of 72?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Rule of 72 is a shortcut to estimate how long it takes to double your money. Divide 72 by your annual interest rate. At 8% interest, your money doubles in 72 ÷ 8 = 9 years.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
