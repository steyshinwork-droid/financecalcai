import type { Metadata } from "next";
import { InvestmentCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "AI Investment Return Calculator — Free | FinanceCalcAI",
  description:
    "Free AI investment calculator. See how $1,000–$100,000 grows over 5–30 years. Compare stocks, ETFs, and bonds with personalized AI insights and instant projections.",
  keywords:
    "ai investment calculator, investment return calculator, free investment calculator, stock return calculator, ROI calculator, investment returns calculator",
  alternates: { canonical: "/investment-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Investment Return Calculator",
  url: "https://www.financecalcai.com/investment-calculator",
  description:
    "Free investment return calculator comparing stocks, bonds, and other assets with AI insights.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function InvestmentPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Investment Return Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          AI Investment Return Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate potential returns on your investments. Compare different
          scenarios and get AI-powered analysis.
        </p>
      </div>
      <InvestmentCalc />

      <div className="mt-10">
        <AffiliateBanner variant="investing" />
      </div>
      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Investment Returns Work
          </h2>
          <p className="text-gray-600">
            Investment returns come from two sources: capital gains (the increase
            in value of your investment) and income (dividends or interest). Over
            long periods, the stock market has historically returned around 7–10%
            per year on average — but returns vary widely year to year. The key
            is staying invested through ups and downs.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            The Power of Time in the Market
          </h2>
          <p className="text-gray-600">
            Time is your most powerful investing tool. Thanks to compound growth,
            $10,000 invested at 8% annually becomes $46,610 in 20 years and
            $100,627 in 30 years — without adding another dollar. Starting early
            matters far more than the amount you invest.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Risk vs. Return
          </h2>
          <p className="text-gray-600">
            Higher potential returns typically come with higher risk. Stocks
            offer the best long-term growth but can drop 30–50% in a bad year.
            Bonds are more stable but grow slower. A diversified portfolio
            balances both — helping you grow wealth while protecting against
            major losses.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What is a good return on investment?", answer: "The S&P 500 has historically returned about 10% per year nominally, or 7% after inflation. For a diversified stock portfolio, 7–10% annually is considered good. Bonds typically return 3–5%. CDs and high-yield savings: 4–5%. Anything consistently above 15% involves significant risk — treat those claims with skepticism." },
        { question: "What is dollar-cost averaging (DCA)?", answer: "Dollar-cost averaging means investing a fixed amount at regular intervals (e.g., $500 every month) regardless of market price. When prices drop, you buy more shares. When prices rise, you buy fewer. Over time, this averages out your cost per share and removes the stress of trying to time the market. Most 401(k) plans work this way automatically." },
        { question: "How much do I need to start investing?", answer: "You can start with as little as $1 using fractional shares on platforms like Fidelity, Schwab, or Robinhood. Most index funds (like Vanguard's VTSAX) have no minimums when bought through a brokerage. The best time to start is now — even $50/month invested consistently for 30 years at 8% grows to over $73,000." },
        { question: "Should I invest in stocks or bonds?", answer: "It depends on your time horizon and risk tolerance. If you're investing for 20+ years, a stock-heavy portfolio (80–100% stocks) historically produces much better returns, since you have time to ride out downturns. If you're retiring in 5–10 years, shifting more to bonds (40–60%) provides stability. A common guideline: subtract your age from 110 to get your stock percentage." },
        { question: "What is an index fund and why do most experts recommend it?", answer: "An index fund tracks a market index like the S&P 500, owning a tiny piece of every company in it. Instead of trying to pick winning stocks, you own everything. They have very low fees (0.03–0.10% vs 1%+ for actively managed funds) and consistently outperform 80–90% of active managers over 15+ years. Warren Buffett has publicly recommended low-cost index funds for most investors." },
      ]} />
      <RelatedArticles calculatorHref="/investment-calculator" />
      <RelatedCalculators currentSlug="investment-calculator" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good return on investment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The S&P 500 has historically returned about 10% per year nominally, or 7% after inflation. A 7-10% annual return is considered good for a long-term stock portfolio. For bonds, 4-5% is typical. Always compare your returns to a relevant benchmark.",
                },
              },
              {
                "@type": "Question",
                name: "What is dollar-cost averaging?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dollar-cost averaging (DCA) means investing a fixed amount at regular intervals regardless of market price. When prices are low you buy more shares; when high, fewer. It removes the stress of timing the market and is the strategy behind most 401(k) contributions.",
                },
              },
              {
                "@type": "Question",
                name: "How much do I need to start investing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can start investing with as little as $1 using fractional shares on platforms like Fidelity, Schwab, or Robinhood. Most index funds have no minimums. The best time to start is now — even small amounts compound significantly over decades.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
