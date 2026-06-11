import type { Metadata } from "next";
import { DividendCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Dividend Calculator — Income & DRIP Growth | FinanceCalcAI",
  description:
    "Free dividend calculator. See your annual dividend income, DRIP reinvestment growth, and portfolio value over time. Compare with and without dividend reinvestment.",
  keywords:
    "dividend calculator, dividend income calculator, DRIP calculator, dividend reinvestment calculator, dividend growth calculator, passive income calculator",
  alternates: { canonical: "/dividend-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Dividend Calculator",
  url: "https://www.financecalcai.com/dividend-calculator",
  description:
    "Calculate dividend income and DRIP reinvestment growth over time with AI insights.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function DividendPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={[{ label: "Dividend Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Dividend Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate your dividend income, see how reinvestment (DRIP) compounds
          your portfolio, and project passive income over time.
        </p>
      </div>
      <DividendCalc />

      <div className="mt-10">
        <AffiliateBanner variant="investing" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            How Dividend Investing Works
          </h2>
          <p className="text-gray-600">
            Dividend investing means owning stocks or funds that pay regular cash
            distributions — typically quarterly — as a share of company profits.
            Your return comes from two sources: price appreciation (the stock
            grows in value) and dividend income (regular cash payments). Together
            these produce "total return." Historically, dividends have contributed
            roughly 40% of the S&P 500's total returns over long periods.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What Is DRIP (Dividend Reinvestment)?
          </h2>
          <p className="text-gray-600">
            A Dividend Reinvestment Plan (DRIP) automatically uses your dividend
            payments to purchase additional shares instead of paying them out as
            cash. This compounding effect is powerful over long periods — more
            shares means larger future dividends, which buy even more shares. Most
            brokerages offer free DRIP enrollment and can purchase fractional
            shares, so every dollar of dividends goes back to work immediately.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Dividend Yield vs. Dividend Growth
          </h2>
          <p className="text-gray-600">
            Dividend yield is the annual dividend divided by the current share
            price — it tells you your income today. Dividend growth rate is how
            fast the company increases its dividend each year. A 2% yield growing
            at 7%/year doubles your income every 10 years. High-yield stocks
            (6–8%) often have slow or no growth; lower-yield stocks (2–3%) with
            consistent growth frequently outperform over 20+ year horizons.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What is a good dividend yield?", answer: "A 'good' yield depends on your goal. For income-focused investors, 3–5% is a solid range from financially healthy companies. Yields above 6–7% are often warning signs — the stock price may have fallen because the market doubts the dividend is sustainable. For long-term growth, 2–3% yield with 6–8% annual dividend growth often outperforms high-yield stocks over 20+ years." },
        { question: "Should I reinvest dividends (DRIP) or take cash?", answer: "DRIP is almost always better during your accumulation years (working, saving, building wealth). Reinvesting compounds your share count and dividend income simultaneously. Take dividends as cash when you're in retirement and need the income, or when you want to manually rebalance your portfolio rather than automatically buying more of the same investment." },
        { question: "What are Dividend Aristocrats?", answer: "Dividend Aristocrats are S&P 500 companies that have increased their dividend every year for at least 25 consecutive years. Examples include Procter & Gamble, Coca-Cola, and Johnson & Johnson. The ProShares S&P 500 Dividend Aristocrats ETF (NOBL) tracks this index. These companies have proven they can grow dividends through recessions, market crashes, and economic disruptions — a strong quality signal." },
        { question: "How do dividends affect taxes?", answer: "Qualified dividends (paid by U.S. companies and most foreign stocks held long enough) are taxed at the lower long-term capital gains rate: 0%, 15%, or 20% depending on income. Ordinary dividends are taxed as regular income. In tax-advantaged accounts (IRA, 401k, Roth IRA), dividends grow tax-deferred or tax-free. Reinvested dividends in taxable accounts are still taxable income in the year paid, even though you didn't receive cash." },
        { question: "How do I start dividend investing?", answer: "The simplest entry point is a dividend ETF — the ProShares Dividend Aristocrats ETF (NOBL) or Vanguard Dividend Appreciation ETF (VIG) provide instant diversification across high-quality dividend payers. For individual stocks, research the payout ratio (dividends paid / earnings — under 60% is sustainable), dividend growth history, and balance sheet strength. Enable DRIP in your brokerage account settings and let compounding do the work." },
      ]} />

      <RelatedArticles calculatorHref="/dividend-calculator" />
      <RelatedCalculators currentSlug="dividend-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a good dividend yield?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A 'good' dividend yield is typically 3–5% from financially healthy companies. Yields above 6–7% may signal financial stress. For long-term growth, 2–3% yield with consistent annual increases often outperforms high-yield stocks over 20+ years.",
                },
              },
              {
                "@type": "Question",
                name: "Should I reinvest dividends (DRIP)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, DRIP is almost always better during your accumulation years. Reinvesting compounds your share count and dividend income simultaneously. Take dividends as cash when you need the income in retirement.",
                },
              },
              {
                "@type": "Question",
                name: "What are Dividend Aristocrats?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dividend Aristocrats are S&P 500 companies that have increased their dividend every year for at least 25 consecutive years, including Procter & Gamble, Coca-Cola, and Johnson & Johnson. The NOBL ETF tracks this index.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
